import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProveedorModal from '../forms/ProveedorModal';
import { jwtDecode } from 'jwt-decode';
import RequestCompany from '../forms/RequestCompany';
import ViewRequest from '../forms/ViewRequest';
import RequestUser from '../forms/RequestUser';
import Empresas from './Vistas/Empresas';
import Agricultores from './Vistas/Agricultor';

const ProveedorDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [peasants, setPeasants] = useState([]); // Estado para los agricultores
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [selectedTab, setSelectedTab] = useState('productos');
  const navigate = useNavigate();
  const token =document.cookie;
  const decodetoken = jwtDecode(token);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const headers = { 'Content-Type': 'application/json' };

    // Recuperar los datos de la cookie
    const userInfoCookie = Cookies.get('token');
    if (!userInfoCookie) {
      navigate('/login');
    }

    const fetchData = async () => {
      try {
        const baseURL = 'https://hackaton-back-production.up.railway.app';

        // Obtener empresas
        const companyResponse = await axios.get(`${baseURL}/companies`, {
          headers,
          withCredentials: true,
        });
        setCompanies(companyResponse.data.data);

        // Obtener agricultores
        const peasantsResponse = await axios.get(`${baseURL}/peasants`, {
          headers,
          withCredentials: true,
        });
        setPeasants(peasantsResponse.data.data);

      } catch (err) {
        setError('Error al obtener los datos: ' + err.message);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Barra lateral */}
      <div className="w-1/5 border-r-2 border-gray-200 text-black p-4 shadow">
        <h2 className="text-xl font-bold mb-4">Menú</h2>
        <ul className="border-2 border-gray-200">
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'productos' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('productos')}
          >
            Productos
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'empresas' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('empresas')}
          >
            Empresas Asociadas
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'agricultores' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('agricultores')}
          >
            Agricultores
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'solicitud' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('solicitud')}
          >
            Crear Solicitud
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'showsol' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('showsol')}
          >
            Ver Solicitudes
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'showrequest' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('showrequest')}
          >
            Lista de Ofertas
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="w-4/5 p-6 mt-12">
        {error && <p className="text-red-500 text-center my-4">{error}</p>}

        {selectedTab === 'productos' && (
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-9" data-aos="fade-left">
              Dashboard Proveedor
            </h1>
            <p className="text-center text-gray-800 mb-8">Aquí encontrarás las empresas y agricultores del Meta que requieran algún producto que puedas ofrecer.</p>
            <ProveedorModal></ProveedorModal>
          </div>
        )}

        {selectedTab === 'empresas' && <Empresas companies={companies} />}

        {selectedTab === 'agricultores' && <Agricultores peasants={peasants} />}
        {/*solicitud*/}
        {selectedTab === 'solicitud' && (
          <div data-aos="fade-left" className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empresas Asociadas</h2>
            <div className="">
            <RequestCompany supplierId={decodetoken.id} className="pt-10"></RequestCompany>
            </div>
          </div>
        )}

        {selectedTab === 'showsol' && (
          <div data-aos="fade-left" className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empresas Asociadas</h2>
            <div className="">
            <ViewRequest></ViewRequest>
            </div>
          </div>
        )}

        {selectedTab === 'showrequest' && (
          <div data-aos="fade-left" className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Empresas Asociadas</h2>
            <div className="">
            <RequestUser></RequestUser>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProveedorDashboard;
