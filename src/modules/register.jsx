import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [peasants, setPeasants] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si la sesión es válida y obtener los datos del usuario
    const checkSession = async () => {
      try {
        const sessionResponse = await axios.get('https://hackaton-back-production.up.railway.app/auth/verify', {
          withCredentials: true, // Esto enviará las cookies de sesión con la solicitud
        });
        console.log('Sesión verificada:', sessionResponse.data);

        // Si la sesión es válida, obtenemos el rol del usuario (o lo extraemos del backend si es necesario)
        const userRole = sessionResponse.data.role; // Suponiendo que el backend devuelve el rol
        console.log('Rol del usuario:', userRole);

        if (!userRole) {
          navigate('/login'); // Redirige al login si el rol no está presente
          return;
        }

        // Dependiendo del rol, realizamos las solicitudes correspondientes
        const fetchData = async () => {
          try {
            if (userRole === 'agricultor') {
              const companyResponse = await axios.get('https://hackaton-back-production.up.railway.app/companies', {
                withCredentials: true,
              });
              const supplierResponse = await axios.get('https://hackaton-back-production.up.railway.app/suppliers', {
                withCredentials: true,
              });
              setCompanies(companyResponse.data.data);
              setSuppliers(supplierResponse.data.data);
            } else if (userRole === 'empresa_turistica') {
              const supplierResponse = await axios.get('https://hackaton-back-production.up.railway.app/suppliers', {
                withCredentials: true,
              });
              const peasantResponse = await axios.get('https://hackaton-back-production.up.railway.app/peasants', {
                withCredentials: true,
              });
              setSuppliers(supplierResponse.data.data);
              setPeasants(peasantResponse.data.data);
            } else if (userRole === 'proveedor') {
              const companyResponse = await axios.get('https://hackaton-back-production.up.railway.app/companies', {
                withCredentials: true,
              });
              const peasantResponse = await axios.get('https://hackaton-back-production.up.railway.app/peasants', {
                withCredentials: true,
              });
              setCompanies(companyResponse.data.data);
              setPeasants(peasantResponse.data.data);
            } else {
              navigate('/login'); // Si el rol no es válido, redirige al login
            }
          } catch (err) {
            setError('Error al obtener los datos: ' + err.message);
          }
        };

        fetchData();
      } catch (err) {
        setError('Error al verificar la sesión: ' + err.message);
        navigate('/login');
      }
    };

    // Verifica la sesión al cargar la página
    checkSession();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Mostrar las empresas, proveedores, campesinos dependiendo del rol */}
      {companies.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Empresas</h2>
          <ul>
            {companies.map((company) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </div>
      )}

      {suppliers.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Proveedores</h2>
          <ul>
            {suppliers.map((supplier) => (
              <li key={supplier.id}>{supplier.name}</li>
            ))}
          </ul>
        </div>
      )}

      {peasants.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Campesinos</h2>
          <ul>
            {peasants.map((peasant) => (
              <li key={peasant.id}>{peasant.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
