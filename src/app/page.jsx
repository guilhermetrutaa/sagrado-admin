'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const users = [
    { id: 'pascom2025', password: 'pascom2025PSCJ', route: '/dashboard-pascom' },
    { id: 'padre', password: 'padremarcio2025PSCJ', route: '/dashboard-padre' },
    { id: 'coordenacao', password: 'coordenacao2025PSCJ', route: '/dashboard-coordenacao' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const validUser = users.find(user => user.id === id && user.password === password);

    if (validUser) {
      router.push(validUser.route); // Redireciona para a página específica do usuário
    } else {
      setError('ID ou senha incorretos!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#AB0000]">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">ID</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-[#AB0000] rounded hover:bg-[#850000]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
