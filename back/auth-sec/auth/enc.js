import bcrypt from 'bcrypt'
import "dotenv/config"

//Hash da Senha
export async function criptografar(password){
    const passwordCrypt = await bcrypt.hash(password,10);
    return passwordCrypt;
}

//Verificar Senha
export async function validarCri(Reqpassword,AdmPass){
    const passwordValidado = await bcrypt.compare(Reqpassword,AdmPass);
    return passwordValidado;
}