
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import faceRouter from './routes/faces.js'; 
import authRouter from './routes/auth.js';

const app = express();
const PORT = 3000;




app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

authRouter(app);
faceRouter(app);



// Inicia o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
