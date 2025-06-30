import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from 'axios';

// Componente reutilizável para capturar e enviar imagem da câmara
export default function CameraCapture({ apiEndpoint, buttonText, onVerificationResult }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseInfo, setResponseInfo] = useState(null);

  // Efeito para ligar/desligar a câmara
  useEffect(() => {
    const videoElement = videoRef.current;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoElement) {
          videoElement.srcObject = stream;
          await videoElement.play();
        }
      } catch (err) {
        setResponseInfo({ type: "error", text: "Erro ao aceder à câmara: " + err.message });
        setCameraOn(false);
      }
    }

    if (cameraOn) {
      startCamera();
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoElement) {
        videoElement.srcObject = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraOn]);

  const toggleCamera = () => {
    setCapturedImage(null);
    setResponseInfo(null);
    setCameraOn(!cameraOn);
  };

  const captureImage = () => {
    if (!videoRef.current || !cameraOn) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL("image/jpeg"));
    setResponseInfo(null);
  };

  const sendImageToAPI = async () => {
    if (!capturedImage) return;
    setIsLoading(true);
    setResponseInfo(null);

    try {
      const blob = await (await fetch(capturedImage)).blob();
      const formData = new FormData();
      formData.append("image", blob, "capture.jpg");

      const token = localStorage.getItem('token');
      const res = await axios.post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      const responseText = res.data;
      const responseType = responseText.toLowerCase().includes('sucesso') || responseText.toLowerCase().includes('sucedida') ? 'success' : 'info';
      setResponseInfo({ type: responseType, text: responseText });

      if (onVerificationResult) {
          onVerificationResult(res.data);
      }

    } catch (err) {
      const errorMsg = err.response?.data || "Erro ao comunicar com o servidor.";
      setResponseInfo({ type: "error", text: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResponse = () => {
    if (!responseInfo) return null;
    let bgColor = "bg-gray-800";
    if (responseInfo.type === 'success') bgColor = 'bg-green-600';
    if (responseInfo.type === 'error') bgColor = 'bg-red-600';
    if (responseInfo.type === 'info') bgColor = 'bg-blue-600';

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-4 my-4 text-white text-center font-semibold ${bgColor}`}
      >
        {responseInfo.text}
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-md bg-white/10 rounded-xl p-4 shadow-lg">
      <div
        className="relative rounded-lg overflow-hidden border-4 border-white mb-4 bg-black"
        style={{ minHeight: 280 }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-opacity duration-500 ${cameraOn ? 'opacity-100' : 'opacity-0'}`}
        />
        {!cameraOn && (
          <div className="absolute inset-0 flex items-center justify-center text-white/60 font-semibold select-none">
            Câmara desligada
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCamera}
          className={`px-5 py-3 rounded-full font-semibold shadow-lg transition-colors ${cameraOn ? "bg-red-600 hover:bg-red-700" : "bg-green-500 hover:bg-green-600"}`}
        >
          {cameraOn ? "Desligar Câmara" : "Ligar Câmara"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={captureImage}
          disabled={!cameraOn}
          className="px-5 py-3 rounded-full font-semibold shadow-lg transition-colors bg-yellow-400 text-yellow-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Capturar
        </motion.button>
      </div>

      {capturedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 text-center"
        >
          <h2 className="mb-2 font-semibold text-lg text-white">Imagem Capturada</h2>
          <img
            src={capturedImage}
            alt="Imagem capturada"
            className="mx-auto max-w-sm rounded-lg border-4 border-white shadow-lg"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendImageToAPI}
            disabled={isLoading}
            className="mt-4 px-5 py-3 w-full rounded-full font-semibold shadow-lg transition-colors bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "A Enviar..." : buttonText}
          </motion.button>
        </motion.div>
      )}

      {renderResponse()}
    </div>
  );
}
