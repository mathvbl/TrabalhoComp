from PIL import Image
import numpy as np
from utils.logs import log_erro
def process_image_file_from_disk(filepath):
    
    """
    Carrega a imagem do disco e retorna numpy array RGB.
    """
    try:
        with Image.open(filepath) as img:
            img = img.convert('RGB')
            return np.asarray(img, dtype=np.uint8)
    except Exception as e:
        log_erro(f"Erro ao carregar imagem do banco {e}",tipo ="file")
        return None    

def process_image_file_from_upload(file_storage):
    """
    Processa a imagem enviada via upload e retorna numpy array RGB.
    """
    try:
        with Image.open(file_storage) as img:
            img = img.convert('RGB')
            return np.asarray(img, dtype=np.uint8)
    
    except Exception as e:
        log_erro(f"Erro ao processar imagem recebida {e}",tipo ="file")
        return None    