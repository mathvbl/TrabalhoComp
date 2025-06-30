import os
import uuid
import face_recognition
import numpy as np
from utils.storage import load_encodings,save_encodings
from utils.logs import log_erro
from utils.faces import process_image_file_from_disk,process_image_file_from_upload
from config import REF_DIR
from flask import Blueprint, request, jsonify

bp_face = Blueprint('faces', __name__) #Blueprint

@bp_face.route('/faces', methods=['POST'])
def add_face():
    try:
        face_id = request.form.get('id')
        name = request.form.get('name')
        file = request.files.get('image')

    
        if not face_id or not name or not file:
            log_erro(
                    f"Campos Ausentes - Rota: {request.path} |" 
                    f"faceid: {'VAZIO' if not face_id or str(face_id).strip() == '' else 'OK'} | "
                    f"name: {'VAZIO' if not name or str(name).strip() == '' else 'OK'} | "
                    f"file: {'VAZIO' if not file else 'OK'}",
                    tipo="requisicao"
                )
            return jsonify({'error': 'ID,Nome e imagem são obrigatórios'}), 400

        face_data = load_encodings() #carrega o json com as informações das faces
        updated = False
        for face in face_data:
            if face['id'] == face_id:
                     return jsonify({'status': 'Usuário já registrado'}), 401
        
        temp_file = os.path.join(REF_DIR,file.filename)
        file.save(temp_file)

        temp_img = process_image_file_from_upload(temp_file)
        if temp_img is None:
            os.remove(temp_file)
            return jsonify({'error': 'Formato inválido'}),400
        
        filename = f"{uuid.uuid4()}.jpg"
        filepath = os.path.join(REF_DIR, filename)
        os.rename(temp_file, filepath)
        image_np = temp_img
        
        
        if image_np.dtype != np.uint8 or (len(image_np.shape) != 3 or image_np.shape[2] != 3):
            log_erro(f"Dados inválidos",tipo = "imagem")
            os.remove(filepath)
            return jsonify({'error': 'Imagem inválida'}), 400

        encodings = face_recognition.face_encodings(image_np)
        if not encodings:
            os.remove(filepath)
            log_erro(f"Rosto Não Reconhecido ID:{face_id} - Rota: {request.path}",tipo="face")
            return jsonify({'error': 'Nenhum rosto detectado'}), 400
        
        
        if face_data is None:
            os.remove(filepath)
            return jsonify({'status': 'Faces não existem'}), 401
        
      

        if not updated:
            # Adiciona novo registro
            face_data.append({
                'id': face_id,
                'name': name,
                'image_file': filename,
                'encoding': encodings[0].tolist()
            })

        # Salva novamente
        
        if not save_encodings(face_data):
            os.remove(filepath)
            return jsonify({'error':'Erro Interno na API'}),500
        
        else:
            return jsonify({'id': face_id, 'name': name}), 201
    
    except Exception as e:
        os.remove(filepath)
        log_erro(f"Erro Servidor {e} - Rota:{request.path}",tipo = "sistema")
        return jsonify({'error':'Erro Interno na API'}),500






@bp_face.route('/faces', methods=['GET'])
def list_faces():
    try:
        face_data = load_encodings()
        if face_data is None:
            return jsonify({'status': 'Faces não existem'}), 401
        # Retorna apenas id e name
        return jsonify([{'id': f['id'], 'name': f['name']} for f in face_data])
    except Exception as e:
        log_erro(f"Erro ao listar faces: {e}", tipo="sistema")
        return jsonify({'error': 'Erro interno'}), 500

@bp_face.route('/faces/<face_id>', methods=['PUT'])
def update_face(face_id):
    try:
        face_data = load_encodings()
        if face_data is None:
            return jsonify({'status': 'Faces não existem'}), 401
        
        # Encontra o registro
        face = next((f for f in face_data if f['id'] == face_id), None)
        if not face:
            return jsonify({'error': 'Face não encontrada'}), 404

        file = request.files.get('image')
        if not file:
            return jsonify({'error': 'Nova imagem obrigatória'}), 400
        temp_file = os.path.join(REF_DIR,file.filename)
        file.save(temp_file)

        temp_img = process_image_file_from_upload(temp_file)
        if temp_img is None:
            os.remove(temp_file)
            return jsonify({'error': 'Formato inválido'}),400
        
        filename = f"{uuid.uuid4()}.jpg"
        filepath = os.path.join(REF_DIR, filename)
        os.rename(temp_file, filepath)

        oldfilepath = os.path.join(REF_DIR, face['image_file'])
        
        

        # Processa e valida imagem
        image_np = temp_img

        if image_np.dtype != np.uint8 or (len(image_np.shape) != 3 or image_np.shape[2] != 3):
            log_erro("Imagem inválida (não RGB ou não 8-bit)", tipo="imagem")
            os.remove(filepath)
            return jsonify({'error': 'Imagem inválida'}), 400

        encodings = face_recognition.face_encodings(image_np)
        if not encodings:
            os.remove(filepath)
            return jsonify({'error': 'Nenhum rosto detectado'}), 400

        
        face['image_file'] = filename
        face['encoding'] = encodings[0].tolist()

        if not save_encodings(face_data):
            os.remove(filepath)
            return jsonify({'error': 'Erro Interno na API'}), 500
        
        os.remove(oldfilepath)
        return jsonify({'message': 'Rosto atualizado com sucesso'})

    except Exception as e:
        log_erro(f"Erro ao atualizar rosto: {e} - Rota:{request.path}", tipo="sistema")
        return jsonify({'error': 'Erro interno'}), 500

@bp_face.route('/faces/<face_id>', methods=['DELETE'])
def delete_face(face_id):
    try:
        face_data = load_encodings()
        if face_data is None:
            return jsonify({'status': 'Faces não existem'}), 401

        # Encontra o rosto com o ID
        face = next((f for f in face_data if f['id'] == face_id), None)
        if not face:
            return jsonify({'error': 'Face não encontrada'}), 404

        # Remove imagem do disco
        image_path = os.path.join(REF_DIR, face['image_file'])
        if os.path.exists(image_path):
            try:
                os.remove(image_path)
            except Exception as e:
                log_erro(f"Erro ao remover imagem física: {e}", tipo="sistema")
                return jsonify({'error': 'Erro ao remover imagem do disco'}), 500

        # Remove face do JSON
        new_list = [f for f in face_data if f['id'] != face_id]
        if not save_encodings(new_list):
            log_erro(f"Erro ao salvar JSON após remoção de {face_id}", tipo="storage")
            return jsonify({'error': 'Erro ao atualizar base de dados'}), 500

        return jsonify({'message': 'Rosto removido com sucesso'})

    except Exception as e:
        log_erro(f"Erro ao remover rosto: {e} - Rota:{request.path}", tipo="sistema")
        return jsonify({'error': 'Erro interno'}), 500
