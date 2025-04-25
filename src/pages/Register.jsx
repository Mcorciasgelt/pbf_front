import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Register() {
  const { token, login } = useAuth()
  const navigate = useNavigate()

  // datos del formulario
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombreFamilia, setNombreFamilia] = useState('');
  const [error, setError] = useState('');

  // aplico aquí un useEffect para mantener al usuario en el panel si ya está logeado y no vuelva a la pantalla con el fformulario
  useEffect(() => {
    if (token) {
      navigate('/panel');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await api.post('/auth/register', {
        nombreUsuario,
        email,
        password,
        nombreFamilia,
      });

      const { usuario, token } = response.data;

      login(usuario, token);
      navigate('/panel');
    } catch (err) {
      console.error('Error en el registro:', err);
      setError(err.response?.data?.mensaje || 'Error al registrar.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta (Padre + Familia)</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del usuario
          </label>
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre de la familia
          </label>
          <input
            type="text"
            value={nombreFamilia}
            onChange={(e) => setNombreFamilia(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Registrarse
          </button>
        </div>

            <p className="mt-4 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-700 font-bold">
                Inicia sesión aquí
            </Link>
            </p>

      </form>
    </div>
  );
}

export default Register;
