import os
from datetime import datetime
def log_erro(mensagem,tipo):
    tipolog = f"logs_{tipo}.txt"
    path = os.path.join("logs",tipolog)
    with open(path, "a") as f:
        f.write(f"[{datetime.now()}] {mensagem}\n")



