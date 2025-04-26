import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Panel() {
  const { user } = useAuth();

  return (

    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-gray-200 flex items-center justify-center p-6">
        <p className="text-xl font-bold text-center">Foto de perfil o familia</p>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          ¡Bienvenido, {user?.nombre}!
        </h1>

      </div>
    </div>

  );
}

export default Panel;
