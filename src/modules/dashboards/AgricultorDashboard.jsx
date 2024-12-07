import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductModal from '../forms/PeasantModal'; // Reemplazar PeasantModal por ProductModal
import { jwtDecode } from 'jwt-decode';
import RequestCompany from '../forms/RequestCompany';
import ViewRequest from '../forms/ViewRequest';
import RequestUser from '../forms/RequestUser';
import Empresas from './Vistas/Empresas';
import Proveedores from "./Vistas/Proveedor";

const ProveedorDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedTab, setSelectedTab] = useState('productos'); // Tab predeterminada
  const navigate = useNavigate();
  const token=document.cookie;
  const decodetoken=jwtDecode(token)

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const headers = { 'Content-Type': 'application/json' };

    // Recuperar los datos de la cookie
    const userInfoCookie = Cookies.get('token');
    if (!userInfoCookie) {
      navigate('/login'); // Si no está autenticado, redirige a Login
    } else {
      try {
        // Aquí podrías decodificar el token si fuera necesario
      } catch (err) {
        console.error('Error al decodificar el token:', err);
        navigate('/login'); // Si el token no es válido, redirige a Login
      }
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

        // Obtener proveedores
        const supplierResponse = await axios.get(`${baseURL}/suppliers`, {
          headers,
          withCredentials: true,
        });
        setSuppliers(supplierResponse.data.data);

      } catch (err) {
        setError('Error al obtener los datos: ' + err.message);
      }
    };

    fetchData();
  }, [navigate]);
  const handleOpenModal = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };
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
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'proveedores' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('proveedores')}
          >
            Proveedores
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 border-b-2 border-gray-200 ${selectedTab === 'empresas' ? 'bg-gray-300' : ''}`}
            onClick={() => setSelectedTab('empresas')}
          >
            Empresas
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
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8" data-aos="fade-up">Bienvenido</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {selectedTab === "proveedores" && (
          <Proveedores suppliers={suppliers} handleOpenModal={handleOpenModal} />
        )}

        {/* Mostrar empresas */}
        {selectedTab === 'empresas' && <Empresas companies={companies} />}

        {/* Mostrar productos */}
        {selectedTab === 'productos' && (
          <div data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registro</h2>
            <ProductModal /> {/* Modal para gestionar productos */}
          </div>
        )}
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

        {/* Mensajes si no hay datos */}
        {selectedTab === 'proveedores' && suppliers.length === 0 && (
          <p className="text-gray-600">No se pudieron cargar los datos de proveedores.</p>
        )}

        {selectedTab === 'empresas' && companies.length === 0 && (
          <p className="text-gray-600">No se pudieron cargar los datos de empresas.</p>
        )}
      </div>
    </div>
  );
};

export default ProveedorDashboard;
