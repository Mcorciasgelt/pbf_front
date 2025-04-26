import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'


function NuevoMiembro() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('hijo');               // Por defecto hijo
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Si el usuario no es padre, redirigimos
  useEffect(() => {
    if (user?.tipo !== 'padre') {
      navigate('/panel');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/users', {
        nombre,
        email,
        tipo,
        password,
      });

      navigate('/miembros'); // ✅ Redirige a la lista de miembros después de crear
    } catch (err) {
      console.error('Error al crear miembro:', err);
      setError(err.response?.data?.mensaje || 'Error al crear miembro.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-gray-200 flex items-center justify-center p-6">
        <p className="text-xl font-bold text-center">Foto de perfil o familia</p>
      </div>

      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
            Añadir nuevo miembro
          </h1>

          {error && <p className="text-red-500 mb-4 text-center md:text-left">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-gray-700">Tipo de perfil</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="border rounded w-full py-2 px-3"
              >
                <option value="padre">Padre</option>
                <option value="hijo">Hijo</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Crear miembro
            </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default NuevoMiembro;
