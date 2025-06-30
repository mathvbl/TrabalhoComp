import React from 'react';
import CameraCapture from '../components/CameraCapture';
import { useNavigate } from 'react-router-dom';

export default function Verificar() {
  const navigate = useNavigate();

  const handleVerification = (response) => {
    // Se a verificação for bem-sucedida, redireciona para o painel após um tempo
    if (typeof response === 'string' && response.toLowerCase().includes('sucedida')) {
      setTimeout(() => {
        navigate('/painel');
      }, 2500); // Espera 2.5 segundos antes de redirecionar
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 text-white flex flex-col items-center p-6">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold">Verificar Acesso</h1>
        <p className="text-white/80 text-base max-w-md">
          Use a câmara para capturar a sua imagem e verificar o acesso ao evento.
        </p>
      </header>
      <CameraCapture
        apiEndpoint="/server/face-verify"
        buttonText="Verificar Acesso"
        onVerificationResult={handleVerification}
      />
    </div>
  );
}
