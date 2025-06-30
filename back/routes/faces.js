import { faceReg,faceVer } from '../controllers/facescontrollers.js';
import multer from 'multer';
import { VerificarToken } from './../auth-sec/auth/token.js';


const storage = multer.memoryStorage();
const upload = multer({ storage });

const faceRouter = (app) => {
  app.post("/server/face-register",VerificarToken,upload.single('image'),faceReg);
  app.post("/server/face-verify",VerificarToken,upload.single('image'),faceVer);
};

export default faceRouter;