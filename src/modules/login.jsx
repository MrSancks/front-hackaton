import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importar jwt-decode
import Cookies from 'js-cookie'; // Importar js-cookie
import backgroundImage from '../2148579758.webp'; // Ruta de la imagen

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const token = Cookies.get('token');
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 > Date.now(); // Verifica si el token no ha expirado
    } catch (error) {
      return false;
    }
  };

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard'); // Si ya está autenticado, redirige al dashboard
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const userData = { email, password };

    try {
      // Realizar la solicitud de login
      const response = await axios.post(
        'https://hackaton-back-production.up.railway.app/auth/login',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Habilitar el manejo de cookies
        }
      );

      // El backend debería colocar el token en una cookie automáticamente
      const token = response.data.token;

      // Guardamos el token en una cookie
      Cookies.set('token', token, {
        expires: 7,
        path: '/', // La cookie será accesible en todo el dominio
        secure: process.env.NODE_ENV === 'production', // Usar secure solo en producción
        sameSite: 'Strict', // Solo se enviará en solicitudes del mismo origen
      });

      // Decodificamos el token para extraer los datos del usuario
      const decodedToken = jwtDecode(token);

      // Guardamos los datos del usuario en una cookie
      Cookies.set('user', JSON.stringify(decodedToken), {
        expires: 7,
        path: '/', // La cookie será accesible en todo el dominio
        secure: process.env.NODE_ENV === 'production', // Usar secure solo en producción
        sameSite: 'Strict', // Solo se enviará en solicitudes del mismo origen
      });

      // Redirigimos al dashboard
      navigate('/dashboard'); // Un único dashboard para todos los usuarios

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
      style={{ backgroundImage: `url(${backgroundImage})` }} // Fondo dinámico
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
