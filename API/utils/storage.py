import json
import os
from config import ENCODING_PATH
from utils.logs import log_erro

# Carrega os dados de rostos salvos no disco
def load_encodings():
    if not os.path.exists(ENCODING_PATH) or os.path.getsize(ENCODING_PATH) == 0:
        return []

    try:
        with open(ENCODING_PATH, "r") as f:
            return json.load(f)
    except Exception as e:
        log_erro(f"Erro ao carregar encoding{e}",tipo ="storage" )
        # Arquivo existe mas contém JSON inválido ou vazio
        return None

# Salva os dados no disco
def save_encodings(data):
    try:
        with open(ENCODING_PATH, "w") as f:
            json.dump(data, f, indent=2)
        return True
    except Exception as e:
        log_erro(f"Erro ao Salvar encoding{e}",tipo ="storage" )
        # Arquivo existe mas contém JSON inválido ou vazio
        return False
    
