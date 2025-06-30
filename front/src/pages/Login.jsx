import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login({ onLoginSuccess }) {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const response = await axios.post('/server/login', { useremail, password });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('token_exp', response.data.exp);

      onLoginSuccess();
      navigate('/painel');

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMensagem("Utilizador ou senha inválida");
      } else {
        setMensagem("Erro ao tentar fazer login. Tente novamente mais tarde.");
      }
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Entrar na sua Conta</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input type="email" placeholder="E-mail" value={useremail} onChange={(e) => setUseremail(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition" required />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition" required />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg">Entrar</button>
        </form>
        {mensagem && <p className="text-red-500 mt-4 text-center">{mensagem}</p>}
        <p className="text-center mt-6 text-sm text-gray-600">
            Não tem uma conta? <Link to="/registrar" className="text-blue-600 hover:underline font-semibold">Registe-se aqui</Link>
        </p>
      </div>
    </div>
  );
}


