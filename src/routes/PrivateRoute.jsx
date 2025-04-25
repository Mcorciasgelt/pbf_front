import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function PrivateRoute({ children }) {
  const { token, authReady } = useAuth();

  if (!authReady) {
    return <p className='text-center mt-10'>Cargando...</p>
  }

  // redirigimos al login si no encuenra un token
  if (!token) {
    return <Navigate to="/login" />;
  }

  // encontré esto con children para redirigir a las rutas privadas
  return children;
}

export default PrivateRoute;
