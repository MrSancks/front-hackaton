import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const headers = { 'Content-Type': 'application/json' };

    const fetchData = async () => {
      try {
        const baseURL = 'https://hackaton-back-production.up.railway.app';

        // Intentamos cargar las empresas
        const companyResponse = await axios.get(`${baseURL}/companies`, {
          headers,
          withCredentials: true,
        });

        setCompanies(companyResponse.data.data);
      } catch (err) {
        setError('Error al obtener los datos: ' + err.message);
      }
    };

    fetchData();
  }, [navigate]);
  const sessionCookie = Cookies.get('token');  // Leer la cookie 'session'
  console.log('Contenido de la cookie session:', sessionCookie);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      
      {/* Mostrar error si no hay sesión activa */}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Mostrar las empresas si las hay */}
      {companies.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">Empresas</h2>
          <ul>
            {companies.map((company) => (
              <li key={company._id} className="mb-4">
                <h3 className="text-lg font-bold">{company.companyName}</h3>
                <p><strong>NIT:</strong> {company.nit}</p>
                <p><strong>Contacto:</strong> {company.contact}</p>
                
                {/* Mostrar los productos requeridos */}
                {company.productsRequired && company.productsRequired.length > 0 ? (
                  <div>
                    <h4 className="text-md font-semibold mt-2">Productos Requeridos</h4>
                    <ul>
                      {company.productsRequired.map((product) => (
                        <li key={product._id}>
                          <p><strong>Producto:</strong> {product.name}</p>
                          <p><strong>Cantidad Requerida:</strong> {product.requiredQuantity}</p>
                          <p><strong>Fecha Estimada:</strong> {new Date(product.estimatedDate).toLocaleDateString()}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No se requieren productos para esta empresa.</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se pudieron cargar los datos de empresas.</p>
      )}
    </div>
  );
};

export default Dashboard;
