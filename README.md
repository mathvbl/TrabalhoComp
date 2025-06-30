
# FaceTicket – Instalação e Execução

## 📌 Pré-requisitos e Observações

O sistema deve ser baixado do seguinte repositório do [GitHub](https://github.com/mathvbl/TrabalhoComp). Nele estão contidos arquivos de variáveis de ambiente (`.env`) **apenas** pelo fato de ser um trabalho educacional.

---

## 🚀 Instalação e Execução do Backend (Node.js)

### 🔎 Visão Geral

Esta aplicação é um webservice construído com Node.js e Express. Suas funcionalidades principais incluem:

- **Autenticação de Utilizadores**: Registo e login com senhas criptografadas e tokens JWT.
- **Integração com API de Faces**: Comunicação com uma API Python/Flask para registar e verificar rostos.
- **Segurança**: Uso de variáveis de ambiente e middlewares para proteger rotas.

### ✅ Pré-requisitos

- **Node.js**: Versão 18 ou superior
- **npm**: Geralmente vem com o Node.js

### 📦 Instalação

1. Navegue até a raiz do projeto no terminal.
2. Execute:
   ```bash
   npm install
   ```

### ⚙️ Configuração das Variáveis de Ambiente

Verifique se existe um arquivo `.env` na raiz com o seguinte conteúdo:

```env
# Chave secreta para gerar os tokens JWT
TOKEN=CHAVE_SECRETA

# URL da API de reconhecimento facial (local)
API_URL=http://127.0.0.1:5000

# Chave de API para acesso à API Python (deve coincidir com a da API Python)
API_KEY=SUA_CHAVE_DA_API_PYTHON
```

Para gerar uma chave para o `TOKEN`, execute:

```bash
node /auth-sec/auth/gerarChave.js
```

### ▶️ Executar o Servidor

Inicie o backend com:

```bash
node index.js # ou use nodemon para facilitar o desenvolvimento
```

Você verá a mensagem:

```
Servidor rodando em http://localhost:3000
```

---

## 🧠 Instalação e Execução da API de Reconhecimento Facial (Python/Flask)

### 🔎 Visão Geral

API desenvolvida em Python + Flask para reconhecimento facial com a biblioteca `face_recognition`.

### ✅ Pré-requisitos

- **Python**: Versão 3.8 ou superior
- Ferramentas de compilação C++ instaladas.

**No Windows:**
- Instale o Visual Studio Community com o workload: `Desenvolvimento para desktop com C++`.

**No Linux (Debian/Ubuntu):**

```bash
sudo apt-get update
sudo apt-get install build-essential cmake
sudo apt-get install python3-dev
```

### 📦 Instalação

1. Crie e ative um ambiente virtual:

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar (Windows)
venv\Scripts\activate

# Ativar (Linux/macOS)
source venv/bin/activate
```

2. Instale as dependências com:

```bash
pip install -r requirements.txt
```

Se houver erros de módulo, instale-os individualmente.

### ⚙️ Configuração da Chave da API

Crie um `.env` na raiz com:

```env
API_KEY=SUA_CHAVE_SECRETA_AQUI
```

### ▶️ Rodar a API

Com o ambiente virtual ativo:

```bash
python app.py
# ou
python3 app.py
```

A API Flask será iniciada.

### 📘 Documentação

Dentro do diretório `docs-api`, há:

- `APIDocs.yaml`: Contém as rotas e erros da API.
- `CarregarDocs`: Instruções para abrir a documentação.

---

## 🎨 Execução do Frontend (React + Vite)

### 🔎 Visão Geral

Frontend desenvolvido com React + Vite.

### ✅ Pré-requisitos

- **Node.js**: Versão LTS (>=18)
- **npm**: Instalado junto com o Node.js
- **Editor de Código**: VS Code recomendado

### 📦 Instalação

1. No terminal, vá até a pasta do frontend.
2. Execute:
   ```bash
   npm install
   ```

### ▶️ Iniciar o Servidor

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

---

## 🧰 Erros Comuns e Soluções

- **Erro de Permissão (`Permission denied`)**:
   ```bash
   chmod +x node_modules/.bin/vite
   ```

- **Erro de Proxy/CORS**: Verifique se o backend está rodando e se a porta está correta no `vite.config.js`.

- **Erro de Acesso à Câmera**: Permita o acesso ao navegador quando solicitado.

- **Erro 401 Unauthorized**: Refaça o login para gerar um novo token JWT.

---

## 📫 Contato

Este é um projeto educacional. Em caso de dúvidas, entre em contato via [GitHub](https://github.com/mathvbl/TrabalhoComp).
