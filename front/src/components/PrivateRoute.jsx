import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const tokenExp = localStorage.getItem('token_exp');

  if (!token || !tokenExp || (Date.now() / 1000) > tokenExp) {
      localStorage.removeItem('token');
      localStorage.removeItem('token_exp');
      return <Navigate to="/login" />;
  }

  return children;
}