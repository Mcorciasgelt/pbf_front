import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Panel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia token
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <p className="text-xl font-bold">Foto de perfil o familia</p>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          ¡Bienvenido, {user?.nombre}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Panel;
