// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importar js-cookie
import backgroundImage from '../2148579758.webp'; // Ruta de la imagen de fondo

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Hook para redirigir

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Enviar la solicitud al backend
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: "include", // Si necesitas que el backend envíe la cookie
        }
      );

      console.log('Respuesta del servidor:', response.data); // Verifica la respuesta del servidor

      // Verifica si la respuesta tiene un campo 'userInfo' y obtiene el rol
      if (response.data && response.data.userInfo) {
        const userRole = response.data.userInfo.role;

        // Guardar la información del usuario (por ejemplo, userInfo y token) en una cookie
       //Cookies.set('token', response.data.token);

        // Redirigir al Dashboard según el rol
        switch (userRole) {
          case 'administrador':
            navigate('/admin-dashboard');
            break;
          case 'agricultor':
            navigate('/agricultor-dashboard');
            break;
          case 'proveedor':
            navigate('/proveedor-dashboard');
            break;
          case 'empresa-turistica':
            navigate('/empresa-turistica-dashboard');
            break;
          default:
            navigate('/');  // Si no tiene rol, redirigir a la página principal o donde sea necesario
            break;
        }
      } else {
        setError('No se pudo obtener el rol del usuario.');
      }

    } catch (err) {
      console.error('Error de autenticación:', err);
      if (err.response) {
        setError(err.response.data.message || 'Error al iniciar sesión.');
      } else {
        setError('Error de red: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
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
              className={`w-full py-2 mt-4 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
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
