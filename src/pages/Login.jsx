import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Login() {
  const { token, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

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
      const response = await api.post('/auth/login', { // aquí es sdonde estamos aprovechando lo que probé en services/api.js
        email,
        password,
      });

      const { usuario, token } = response.data;

      // login del contexto
      login(usuario, token)
      navigate('/panel')
    } catch (err) {
      console.error('Error en el login:', err);
      setError('Email o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

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

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ingresar
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-700 font-bold">
                Regístrate
            </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;
