import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function EditarMiembro() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [miembro, setMiembro] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.tipo !== 'padre') {
      navigate('/panel');
    }
  }, [user, navigate]);

  useEffect(() => {
    const obtenerMiembro = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setMiembro(response.data);
      } catch (err) {
        console.error('Error al obtener miembro:', err);
        setError('No se pudo cargar el miembro.');
      }
    };

    obtenerMiembro();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.put(`/users/${id}`, {
        nombre: miembro.nombre,
        email: miembro.email,
        tipo: miembro.tipo,
      });
      navigate('/miembros');
    } catch (err) {
      console.error('Error al actualizar miembro:', err);
      setError('No se pudo actualizar el miembro.');
    }
  };

  if (!miembro) {
    return <p className="text-center mt-10">Cargando miembro...</p>;
  }

  return (
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/2 bg-gray-200 flex items-center justify-center p-6">
          <p className="text-xl font-bold text-center">Foto de perfil o familia</p>
        </div>

        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
              Editar miembro
            </h1>

            {error && <p className="text-red-500 mb-4 text-center md:text-left">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={miembro.nombre}
                  onChange={(e) => setMiembro({ ...miembro, nombre: e.target.value })}
                  required
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={miembro.email}
                  onChange={(e) => setMiembro({ ...miembro, email: e.target.value })}
                  required
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div>
                <label className="block text-gray-700">Tipo de perfil</label>
                <select
                  value={miembro.tipo}
                  onChange={(e) => setMiembro({ ...miembro, tipo: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                >
                  <option value="padre">Padre</option>
                  <option value="hijo">Hijo</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                Guardar cambios
              </button>
            </form>
          </div>
        </div>
      </div>

  );
}

export default EditarMiembro;
