import FormData from 'form-data';
import axios from "axios";
import { Readable } from 'stream';



export async function faceReg(req,res){
  if (!req.file) return res.status(400).json({ erro: 'Imagem obrigatória' });

  try {
    
    const form = new FormData();
    const buffer = new  Readable();
    buffer.push(req.file.buffer);
    buffer.push(null)
    form.append('id',req.user.id);
    form.append('name',`${new Date().toISOString()}`);
    form.append('image', buffer,{
      filename: req.file.originalname,
      contentType: 'application/octet-stream',
    });

    console.log(process.env.API_KEY);
    const response = await axios.post(`${process.env.API_URL}/faces`, form, {
      headers:{...form.getHeaders(),
        'x-api-key':process.env.API_KEY
      
      },
      validateStatus: function (status) {
                      return true; // Considera qualquer status como "válido"
                      }
    });

   if(response.status===500) return res.status(500).json('Erro Interno')
   if(response.status===401 || response.status===400 ) return res.status(401).json('Erro no Registro');
   
  
   return res.status(200).json('Registro Bem Sucedido');
   
 
    
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno' });
  }
    
  
};


export async function faceVer(req,res){
  if (!req.file) return res.status(400).json({ erro: 'Imagem obrigatória' });

  try {
    

    const form = new FormData();
    const buffer = new  Readable();
    buffer.push(req.file.buffer);
    buffer.push(null)
    form.append('id',req.user.id);
    form.append('image', buffer,{
      filename: req.file.originalname,
      contentType: 'application/octet-stream',
    });
    console.log(process.env.API_KEY);
    const response = await axios.post(`${process.env.API_URL}/verify`, form, {
     headers:{...form.getHeaders(),
        'x-api-key':process.env.API_KEY
      
      },
      validateStatus: function (status) {
                      return true; // Considera qualquer status como "válido"
                      }
    });
   if(response.status===500) return res.status(500).json('Erro Interno')
   if(response.status===401 || response.status===400 ) return res.status(401).json('Erro na Verificação');
   
  
   return res.status(200).json('Verificação Bem Sucedida' );
   
    
    
    
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno' });
  }
};