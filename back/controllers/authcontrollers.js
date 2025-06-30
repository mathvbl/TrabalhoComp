
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from "crypto";
import { CriarToken } from './../auth-sec/auth/token.js';
import { criptografar,validarCri } from '../auth-sec/auth/enc.js';

const _filename = fileURLToPath(import.meta.url); //pega o caminho do arquivo atual  
const _dirname = path.dirname(_filename)    //remove o nome do arquivo (index.js)
const bd_Path = path.join(_dirname,'..','bd','banco.json');





export async function login(req,res){

    try{
        const {useremail,password} = req.body;
        
        const banco = fs.readFileSync(bd_Path,'utf8');
        const dados = JSON.parse(banco);

        const usuario = dados.usuarios.find(u => u.useremail === useremail) || null;
        if(usuario){
                const valPass = await validarCri(password,usuario.criptPass);
                if(valPass){

                  
                    const {token,exp} = await CriarToken(usuario.id);
                    return res
                    .status(200)
                    .json({
                        token,
                        exp
                    });
                
                }else{
                    
                    return res.status(401).json("Usuário ou senha inválida");
                
                }
        }else{
           
            return res.status(401).json("Usuário ou senha inválida");
        
        }
   
    }catch(err){

        return res.status(500).json("Erro encontrado");

    }

};

export async function register(req,res){
   
   
   
   try{
        const {username,useremail,password,telefone} = req.body;
        const banco = fs.readFileSync(bd_Path,'utf8');
        const dados = JSON.parse(banco);
      
        if ([username, useremail, password,telefone].some(value => !value)) {
            return res.status(400).json( 'Todos os campos são obrigatórios' );
         }
        const email = dados.usuarios.find(e=>e.useremail === useremail);
        if(email){
        
            return res.status(409).json("Email já em uso");
    
        }else{
            
                const novoid = dados.contadorID+1;
                dados.contadorID=novoid;
                const criptPass = await criptografar(password);
                const novoRegistro = {
                    id:novoid,
                    username,
                    useremail,
                    criptPass,
                    telefone,
                    dataRegistro: new Date().toISOString(),   
                };
           
                dados.usuarios.push(novoRegistro);
                fs.writeFileSync(bd_Path, JSON.stringify(dados, null, 2));
               
                return res.status(200).json("Cadastrado com sucesso");                    
        }
    
    }catch(err){
            return res.status(500).json("Erro Interno");
        }
    
};

