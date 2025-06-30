import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from utils.logs import log_erro
# Importar blueprints das rotas
from routes.faces_rout import bp_face
from routes.verify_rout import bp_verify

load_dotenv()  # carrega variáveis do .env para o ambiente

API_KEY = os.getenv("API_KEY")


app = Flask(__name__)
CORS(app)

@app.before_request
def verificar_api_key():
    
    if request.method == 'OPTIONS':
        return
    try:
        api_key = request.headers.get("x-api-key")
        if not api_key or api_key != API_KEY:
            log_erro(f"Acesso Negado - Chave inválida",tipo = "middleware")
            return jsonify({'error': 'Chave da API inválida ou ausente'}), 401
    except Exception as e:
        log_erro(f"Erro no middleware de verificação da API key: {e}",tipo="middleware")
        return jsonify({'error':'Erro Interno na API'}),500

# Registrar blueprints com seus prefixos corretos
app.register_blueprint(bp_face)
app.register_blueprint(bp_verify)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
