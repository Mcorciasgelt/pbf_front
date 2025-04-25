import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // solo mostramos la barra de navegación si tenemos usuario logueado
  if (!user) return null;

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        Tu Familia Organizada
      </div>

      <div className="space-x-4">
        <Link to="/panel" className="hover:text-yellow-300">Panel</Link>
        <Link to="/miembros" className="hover:text-yellow-300">Mi Familia</Link>
        <Link to="/perfil" className="hover:text-yellow-300">Mi Perfil</Link>
        <Link to="/vistas" className="hover:text-yellow-300">Mis Vistas</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
