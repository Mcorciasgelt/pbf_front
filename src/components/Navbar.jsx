import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

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


      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
      >
        ☰
      </button>
      <div className={`flex-col md:flex md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
        <Link to="/panel" className="hover:text-yellow-300">Panel</Link>
        <Link to="/vistas" className="hover:text-yellow-300">Mis Vistas</Link>

        {user.tipo === "padre" && (
          <Link to="/miembros" className="hover:text-yellow-300">Mi Familia</Link> 
        )}

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
