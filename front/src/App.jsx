import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import Faces from './pages/Faces';
import Verificar from './pages/Verificar';
import Painel from './pages/Painel';
import PrivateRoute from './components/PrivateRoute';
import { useState, useEffect } from 'react';

function AppContent() {
  const [logado, setLogado] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => {
    setLogado(!!localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_exp');
    setLogado(false);
    window.location.href = '/login'; 
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {logado && (
         <header className="bg-blue-700 text-white shadow-md sticky top-0 z-10">
           <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
               <h1 className="text-2xl font-bold">FaceTicket</h1>
               <div className="flex gap-4 sm:gap-6 items-center">
                  <Link to="/painel" className="hover:text-blue-200 transition text-sm sm:text-base">Painel</Link>
                  <Link to="/faces" className="hover:text-blue-200 transition text-sm sm:text-base">Registrar Rosto</Link>
                  <Link to="/verificar" className="hover:text-blue-200 transition text-sm sm:text-base">Verificar</Link>
                  <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition text-sm sm:text-base">Sair</button>
               </div>
           </nav>
         </header>
      )}
      <main>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={() => setLogado(true)} />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/faces" element={<PrivateRoute><Faces /></PrivateRoute>} />
          <Route path="/verificar" element={<PrivateRoute><Verificar /></PrivateRoute>} />
          <Route path="/painel" element={<PrivateRoute><Painel /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Painel /></PrivateRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
