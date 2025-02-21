"use client";

import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://backend-avisos-port4000.up.railway.app");

export default function Home() {
  const [manchete, setManchete] = useState("");
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagem(reader.result); // Converte a imagem para base64
      };
      reader.readAsDataURL(file);
    }
  };

  const enviarAviso = () => {
    if (manchete.trim() && resumo.trim() && conteudo.trim()) {
      socket.emit("novo_aviso", {
        manchete,
        resumo,
        conteudo,
        imagem: imagem || "", // Envia a imagem se houver
        data: new Date().toLocaleString(),
      });

      // Resetando os campos após envio
      setManchete("");
      setResumo("");
      setConteudo("");
      setImagem(null);
    } else {
      alert("Preencha todos os campos antes de enviar o aviso!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-[#AB0000]">Painel de Envio de Avisos</h1>
      
      <input
        type="text"
        className="border p-2 w-96 mb-2"
        placeholder="Título do Aviso"
        value={manchete}
        onChange={(e) => setManchete(e.target.value)}
      />
      
      <input
        type="text"
        className="border p-2 w-96 mb-2"
        placeholder="Resumo do Aviso"
        value={resumo}
        onChange={(e) => setResumo(e.target.value)}
      />
      
      <textarea
        className="border p-2 w-96 h-24 mb-2"
        placeholder="Conteúdo completo do aviso..."
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
      />
      
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />
      
      {imagem && <img src={imagem} alt="Prévia" className="mt-2 w-32 h-32 object-cover" />}
      
      <button 
        onClick={enviarAviso} 
        className="mt-3 bg-[#AB0000] text-white px-4 py-2 rounded">
        Enviar Aviso
      </button>
    </div>
  );
}
