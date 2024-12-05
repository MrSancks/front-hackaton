import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { Link } from 'react-router-dom'; // Importamos Link

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Creamos la instancia de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificación simple para las contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setError('');
    setLoading(true);

    const userData = {
      name,
      email,
      password,
      confirmPassword,
      role,
    };

    try {
      const response = await axios.post('https://hackaton-back-production.up.railway.app/auth/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Si la respuesta es exitosa, redirigimos al login
      console.log('Usuario registrado', response.data);
      navigate('/login'); // Redirige a la página de login
    } catch (error) {
      if (error.response) {
        // Si el servidor respondió con un error
        setError(error.response.data.message || 'Ocurrió un error al registrar el usuario');
      } else {
        // Si no hubo respuesta del servidor (problemas de red, etc.)
        setError('Error de red: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}>
      <div className="absolute inset-0 bg-white opacity-30 backdrop-blur-lg"></div>
      <div className="absolute inset-0 flex justify-center items-center p-4">
        <div className="max-w-sm w-full bg-white p-6 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Crear cuenta</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un rol</option>
                <option value="agricultor">Agricultor</option>
                <option value="proveedor">Proveedor</option>
                <option value="empresa_turistica">Empresa Turística</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-4 text-white font-semibold rounded-md ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
