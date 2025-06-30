import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Registrar() {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensagem('');
    try {
        const response = await axios.post('/server/register', {
            username,
            useremail,
            password,
            telefone
        });
        setMensagem(response.data);
        if (response.status === 200) {
            setTimeout(() => navigate('/login'), 2000);
        }
    } catch (error) {
        if (error.response && error.response.data) {
            setMensagem(error.response.data);
        } else {
            setMensagem("Erro ao registrar. Tente novamente.");
        }
        console.error("Erro no registro:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Criar Nova Conta</h2>
        <form onSubmit={handleRegistro} className="flex flex-col gap-5">
          <input type="text" placeholder="Nome de Utilizador" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition" required />
          <input type="email" placeholder="E-mail" value={useremail} onChange={(e) => setUseremail(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition" required />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition" required />
          <input type="tel" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition" required />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg">Registar</button>
        </form>
        {mensagem && <p className={`text-center mt-4 font-semibold ${mensagem.includes('sucesso') ? 'text-green-600' : 'text-red-500'}`}>{mensagem}</p>}
        <p className="text-center mt-6 text-sm text-gray-600">
            Já tem uma conta? <Link to="/login" className="text-blue-600 hover:underline font-semibold">Faça o login</Link>
        </p>
      </div>
    </div>
  );
}


