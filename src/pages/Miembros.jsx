import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import useMiembros from '../hooks/useMiembros';

function Miembros() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  // aseguramos que el usuario que está ingresando sea padre
  useEffect(() => {
    if (user === null) return
    
    if (user?.tipo !== 'padre') {
      navigate('/panel');
    }
  }, [user, navigate]);

  // se cargan los miembros de la familia que luego se pintarán en el html renderizado de abajo 
  // (lo había hecho con la función aquí pero lo cambié para usar el hook que creé luego useMiembros.js)

  const { miembros, loading, error, refetchMiembros } = useMiembros()

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este miembro?');
  
    if (confirmacion) {
      try {
        await api.delete(`/users/${id}`); 
        // Refrescamos la lista de miembros:
        await refetchMiembros()
      } catch (err) {
        console.error('Error al eliminar miembro:', err);
        alert('No se pudo eliminar el miembro.');
      }
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row h-screen">
      
      <div className="w-full md:w-1/2 bg-gray-200 flex items-center justify-center p-6">
        <p className="text-xl font-bold text-center">Foto de perfil o familia</p>
      </div>

      
      <div className="w-full md:w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          Miembros de la familia
        </h1>

        {loading && <p className="text-gray-600 mb-4 text-center md:text-left">Cargando miembros...</p>}
        {error && <p className="text-red-500 mb-4 text-center md:text-left">{error}</p>}

        <div className="flex justify-center md:justify-start">
          <button
            onClick={() => navigate('/nuevo-miembro')}
            className="mb-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Añadir nuevo miembro
          </button>
        </div>

        <ul className="space-y-4">
          {miembros.map((miembro) => (
            <li
              key={miembro._id}
              className="p-4 border rounded shadow flex flex-col md:flex-row justify-between items-center"
            >
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="font-bold">{miembro.nombre}</p>
                <p className="text-sm text-gray-600">{miembro.email} — {miembro.tipo}</p>
              </div>

              <div className="space-x-2">
                <button 
                  onClick={() => navigate(`/editar-miembro/${miembro._id}`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded"
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleEliminar(miembro._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default Miembros;