import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de importar jwt-decode

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [peasants, setPeasants] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // Si no hay token, redirigimos al login
      navigate('/login');
      return;
    }

    try {
      // Decodificamos el token para obtener los datos del usuario
      const decodedToken = jwtDecode(token);
      console.log(decodedToken); // Aquí puedes ver el contenido del token

      // Extraemos el rol del token
      const userRole = decodedToken.role;
      console.log('Rol del usuario:', userRole); // Muestra el rol en consola

      // Si no hay rol, redirigimos al login
      if (!userRole) {
        navigate('/login');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      // Dependiendo del rol, hacemos las peticiones correspondientes
      const fetchData = async () => {
        try {
          if (userRole === 'agricultor') {
            const companyResponse = await axios.get('https://hackaton-back-production.up.railway.app/companies', { headers });
            const supplierResponse = await axios.get('https://hackaton-back-production.up.railway.app/suppliers', { headers });
            setCompanies(companyResponse.data.data);
            setSuppliers(supplierResponse.data.data);
          } else if (userRole === 'empresa_turistica') {
            const supplierResponse = await axios.get('https://hackaton-back-production.up.railway.app/suppliers', { headers });
            const peasantResponse = await axios.get('https://hackaton-back-production.up.railway.app/peasants', { headers });
            setSuppliers(supplierResponse.data.data);
            setPeasants(peasantResponse.data.data);
          } else if (userRole === 'proveedor') {
            const companyResponse = await axios.get('https://hackaton-back-production.up.railway.app/companies', { headers });
            const peasantResponse = await axios.get('https://hackaton-back-production.up.railway.app/peasants', { headers });
            setCompanies(companyResponse.data.data);
            setPeasants(peasantResponse.data.data);
          } else {
            // Si el rol no es válido, redirigimos
            navigate('/login');
          }
        } catch (err) {
          setError('Error al obtener los datos: ' + err.message);
        }
      };

      fetchData();
    } catch (err) {
      setError('Error al decodificar el token: ' + err.message);
      navigate('/login');
    }
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
