import os
from pathlib import Path
from utils.logs import log_erro


try:
    ENCODING_DB = "encodings_faces"
    REF_DIR = "reference_faces"
    os.makedirs(REF_DIR, exist_ok=True)
    os.makedirs(ENCODING_DB, exist_ok=True)
    os.makedirs("logs", exist_ok=True)
    ENCODING_PATH= os.path.join(ENCODING_DB,"encodings.json")
    if not os.path.exists(ENCODING_PATH) or os.path.getsize(ENCODING_PATH) == 0:
        with open(ENCODING_PATH, "w", encoding="utf-8") as f:
            f.write("[]")
except Exception as e:
    log_erro(f"Erro ao carregar config: {e}",tipo="config")


