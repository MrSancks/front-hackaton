import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Función para obtener datos del usuario desde el localStorage
  const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 > Date.now(); // Verifica si el token no ha expirado
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const userData = { email, password };

    try {
      const response = await axios.post(
        'https://hackaton-back-production.up.railway.app/auth/login',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token } = response.data;

      // Guardamos el token en localStorage
      localStorage.setItem('token', token);

      // Decodificamos el token para extraer los datos del usuario
      const decodedToken = jwtDecode(token);

      // Guardamos los datos del usuario en localStorage
      localStorage.setItem('user', JSON.stringify(decodedToken));

      // Verificamos el rol del usuario
      const userRole = decodedToken.role; // Asegúrate de que el token contenga un campo 'role'

      // Redirigir dependiendo del rol
      if (userRole === 'admin') {
        navigate('/admin-dashboard'); // Redirige al dashboard del admin
      } else if (userRole === 'user') {
        navigate('/user-dashboard'); // Redirige al dashboard del usuario
      } else {
        navigate('/dashboard'); // Redirige a un dashboard por defecto
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Ocurrió un error al iniciar sesión');
      } else {
        setError('Error de red: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}
    >
      <div className="absolute inset-0 bg-white opacity-30 backdrop-blur-lg"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-full sm:w-96 bg-white p-6 border rounded-lg shadow-lg z-10">
          <h2 className="text-2xl font-semibold text-center mb-4">Iniciar sesión</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-4 text-white font-semibold rounded-md ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
