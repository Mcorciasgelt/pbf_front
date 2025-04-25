import { createContext, useState, useEffect } from 'react';

// crear el contexto que se usará en todo el código
export const AuthContext = createContext();

// proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // el usuario empieza en null
  const [token, setToken] = useState(null); // el token también

  const [authReady, setAuthReady] = useState(false)

  // revisar en le local storage si ya hay token guardado
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setAuthReady(true)
  }, []);

  // función para iniciar la sesión y que se guarde en el localStorage
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
  };

  // logout de la sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};
