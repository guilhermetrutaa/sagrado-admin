"use client";

import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://backend-avisos-port4000.up.railway.app");

export default function PainelEventos() {
  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const enviarEvento = () => {
    if (mensagem.trim() !== "") {
      socket.emit("novo_evento", {
        texto: mensagem,
        data: new Date().toISOString(), // Armazena corretamente a data
        imagem: imagem,
      });
      setMensagem("");
      setImagem(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-[#AB0000]">Painel de Envio de Eventos</h1>
      
      <textarea
        className="border p-2 w-96 h-24"
        placeholder="Digite o evento..."
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
      />

      <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />

      {imagem && <img src={imagem} alt="Prévia" className="mt-2 w-32 h-32 object-cover" />}

      <button 
        onClick={enviarEvento} 
        className="mt-3 bg-[#AB0000] text-white px-4 py-2 rounded"
      >
        Enviar Evento
      </button>
    </div>
  );
}
