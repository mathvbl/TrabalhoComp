import crypto from "crypto";



export async function criptografarIMG(arquivo, key) {
  try {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    // Encripta o buffer original diretamente
    const encrypted = Buffer.concat([
      cipher.update(arquivo.buffer),
      cipher.final()

    ]);
    const tag = cipher.getAuthTag();
  //retorna iv + encrypted + tag
  return Buffer.concat([iv, encrypted, tag]);

  } catch (err) {
    console.error('Erro na encriptação:', err);
    throw err;
  }
}


export function encriptarTexto(dado,key){
    try{
        //Pegar o texto para encriptar
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        const enc= Buffer.concat([cipher.update(dado,'utf8'), cipher.final()]);
        const textoEnc =Buffer.concat([iv,enc]).toString('base64url'); 
        return textoEnc;

    }catch(err){
        throw err
}
}


export function decifrarTexto(dado,key){

    try{
        
        const texto =  Buffer.from(dado,'base64url');
        
        //Pegar o iv salvo para decifrar
        const iv =texto.subarray(0,16);
        const textoEnc=texto.subarray(16);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        const textoDec= Buffer.concat([decipher.update(textoEnc,'utf8'), decipher.final()]);
        return textoDec.toString('utf-8');

    }catch(err){
        throw err
    }

}