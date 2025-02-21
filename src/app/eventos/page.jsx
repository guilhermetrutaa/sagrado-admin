"use client";

import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://backend-avisos-port4000.up.railway.app");

export default function PainelEventos() {
  const [manchete, setManchete] = useState("");
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
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
    if (manchete.trim() && resumo.trim() && conteudo.trim()) {
      socket.emit("novo_evento", {
        manchete,
        resumo,
        conteudo,
        imagem: imagem || "",
        data: new Date().toISOString(), // Guarda a data em formato ISO
      });
      setManchete("");
      setResumo("");
      setConteudo("");
      setImagem(null);
    } else {
      alert("Preencha todos os campos (manchete, resumo e conteúdo) antes de enviar.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-[#AB0000]">Painel de Envio de Eventos</h1>
      
      <input
        type="text"
        className="border p-2 w-96 mb-2"
        placeholder="Digite a manchete do evento"
        value={manchete}
        onChange={(e) => setManchete(e.target.value)}
      />
      
      <input
        type="text"
        className="border p-2 w-96 mb-2"
        placeholder="Digite o resumo do evento"
        value={resumo}
        onChange={(e) => setResumo(e.target.value)}
      />
      
      <textarea
        className="border p-2 w-96 h-24 mb-2"
        placeholder="Digite o conteúdo completo do evento..."
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
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
