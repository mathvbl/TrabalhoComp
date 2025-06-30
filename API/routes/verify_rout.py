import os
import numpy as np
import face_recognition
from utils.faces import process_image_file_from_upload
from utils.storage import load_encodings,save_encodings
from utils.logs import log_erro
from flask import Blueprint, request, jsonify


bp_verify = Blueprint('verify', __name__) #Blueprint

@bp_verify.route('/verify', methods=['POST'])
def verify_face():
    try:
        face_id = request.form.get('id')
        file = request.files.get('image')
       
        
        if not face_id or not file:
            log_erro(
                    f"Campos Ausentes - Rota: {request.path} |"
                    f"faceid: {'VAZIO' if not face_id else 'OK'} | "
                    f"file: {'VAZIO' if not file else 'OK'}",
                    tipo="requisicao"
                )
            return jsonify({'error': 'ID e Imagem obrigatória'}), 400

        image_np = process_image_file_from_upload(file)
        if image_np is None:
            return jsonify({'error': 'Imagem formato Inválido'}), 400
        
        # Confirma que é RGB e 8bit
        if image_np.dtype != np.uint8 or (len(image_np.shape) != 3 or image_np.shape[2] != 3):
            log_erro("Imagem inválida (não RGB ou não 8-bit)", tipo="imagem")
            return jsonify({'error': 'Imagem inválida'}), 400

        encodings = face_recognition.face_encodings(image_np)
        if not encodings:
            log_erro(f"Rosto Não Reconhecido ID:{face_id} - Rota: {request.path}",tipo="face")
            return jsonify({'status': 'unauthorized'}), 401
        
        input_encoding = encodings[0]
        face_data = load_encodings()
       
    
        if not face_data:
            return jsonify({'status': 'unauthorized'}), 401
        
        
        for face in face_data:
                if face['id'] == face_id:
                    req_encoding = np.array(face['encoding'])  # converte para numpy array

                    match = face_recognition.compare_faces([req_encoding], input_encoding)[0]
                    if match:
                        return jsonify({
                            'status': 'authorized',
                            'user_id': face['id'],
                            'name': face['name']
                        })
        log_erro(f"Rostos não correspondentes ID {face_id} - Rota: {request.path}",tipo="unauthorized")
        return jsonify({'status': 'unauthorized'}), 401    
    
    except Exception as e:
        log_erro(f"Erro Servidor: {e} - Rota:{request.path}",tipo = "Sistema")
        return jsonify({'error':'Erro Interno na API'}),500

