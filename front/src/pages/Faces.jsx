import React from 'react';
import CameraCapture from '../components/CameraCapture';

export default function Faces() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white flex flex-col items-center p-6">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold">Registrar Rosto</h1>
        <p className="text-white/80 text-base max-w-md">
          Envie uma imagem nítida do seu rosto. Isto será usado para verificar a sua entrada nos eventos.
        </p>
      </header>
      <CameraCapture
        apiEndpoint="/server/face-register"
        buttonText="Registrar Rosto"
      />
    </div>
  );
}
