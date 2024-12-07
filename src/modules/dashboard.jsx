import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BuildingOffice2Icon, SunIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [peasants, setPeasants] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const headers = { 'Content-Type': 'application/json' };

        const fetchData = async () => {
            try {
                const baseURL = 'https://hackaton-back-production.up.railway.app';

                // Fetch Companies
                const companyResponse = await axios.get(`${baseURL}/companies`, {
                    headers,
                    withCredentials: true,
                });

                // Remove duplicate companies based on productsRequired
                const uniqueCompanies = removeDuplicateEntities(companyResponse.data.data, 'productsRequired');
                setCompanies(uniqueCompanies);

                // Fetch Peasants
                const peasantResponse = await axios.get(`${baseURL}/peasants`, {
                    headers,
                    withCredentials: true,
                });

                // Remove duplicate peasants based on products
                const uniquePeasants = removeDuplicateEntities(peasantResponse.data.data, 'products');
                setPeasants(uniquePeasants);

                // Fetch Suppliers
                const supplierResponse = await axios.get(`${baseURL}/suppliers`, {
                    headers,
                    withCredentials: true,
                });

                // Remove duplicate suppliers based on productsOffered
                const uniqueSuppliers = removeDuplicateEntities(supplierResponse.data.data, 'productsOffered');
                setSuppliers(uniqueSuppliers);
            } catch (err) {
                setError('Error al obtener los datos: ' + err.message);
            }
        };

        fetchData();
    }, [navigate]);

    // Helper function to remove duplicates based on products
    const removeDuplicateEntities = (entities, productKey) => {
        const seen = new Set();
        return entities.filter((entity) => {
            const productSignature = entity[productKey]?.map((product) => product.name).join('|') || '';
            if (seen.has(productSignature)) {
                return false;
            }
            seen.add(productSignature);
            return true;
        });
    };

    const renderCard = (data, type) => {
        let bgColor, title, Icon;

        switch (type) {
            case 'company':
                bgColor = 'bg-blue-100';
                title = 'Empresas Turísticas';
                Icon = BuildingOffice2Icon;
                break;
            case 'peasant':
                bgColor = 'bg-green-100';
                title = 'Agricultores';
                Icon = SunIcon;
                break;
            case 'supplier':
                bgColor = 'bg-orange-100';
                title = 'Proveedores';
                Icon = ShoppingBagIcon;
                break;
            default:
                bgColor = 'bg-gray-100';
                title = 'Datos';
        }

        return (
            <div key={title} className={`p-4 ${bgColor} rounded-lg shadow-md`}>
                <div className="flex items-center mb-4">
                    <Icon className="h-8 w-8 text-gray-600 mr-2" />
                    <h3 className="text-xl font-bold text-gray-700">{title}</h3>
                </div>
                <div className="space-y-4">
                    {data.map((item) => (
                        <div key={item._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                            {type === 'company' && (
                                <>
                                    <h4 className="text-lg font-semibold text-blue-600">{item.companyName}</h4>
                                    <p><strong>NIT:</strong> {item.nit}</p>
                                    <p><strong>Contacto:</strong> {item.contact}</p>
                                    <h5 className="font-semibold mt-3">Productos Requeridos</h5>
                                    <ul className="list-disc list-inside">
                                        {item.productsRequired?.length > 0 ? (
                                            item.productsRequired.map((product) => (
                                                <li key={product._id} className="text-sm">
                                                    {product.name} - {product.requiredQuantity} unidades
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">Sin productos requeridos.</p>
                                        )}
                                    </ul>
                                </>
                            )}
                            {type === 'peasant' && (
                                <>
                                    <h4 className="text-lg font-semibold text-green-600">{item.farmName}</h4>
                                    <p><strong>Ubicación:</strong> Lat: {item.ubication.latitude}, Lng: {item.ubication.longitude}</p>
                                    <h5 className="font-semibold mt-3">Productos</h5>
                                    <ul className="list-disc list-inside">
                                        {item.products?.length > 0 ? (
                                            item.products.map((product) => (
                                                <li key={product._id} className="text-sm">
                                                    {product.name} - {product.productionQuantity} libras
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">Sin productos registrados.</p>
                                        )}
                                    </ul>
                                </>
                            )}
                            {type === 'supplier' && (
                                <>
                                    <h4 className="text-lg font-semibold text-orange-600">{item.supplierName}</h4>
                                    <p><strong>NIT:</strong> {item.nit}</p>
                                    <p><strong>Contacto:</strong> {item.contactPhone}</p>
                                    <p><strong>Dirección:</strong> {item.address}</p>
                                    <h5 className="font-semibold mt-3">Productos Ofrecidos</h5>
                                    <ul className="list-disc list-inside">
                                        {item.productsOffered?.length > 0 ? (
                                            item.productsOffered.map((product) => (
                                                <li key={product._id} className="text-sm">
                                                    {product.name} - ${product.price} / {product.quantity} unidades
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">Sin productos ofrecidos.</p>
                                        )}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderCard(companies, 'company')}
                {renderCard(peasants, 'peasant')}
                {renderCard(suppliers, 'supplier')}
            </div>
        </div>
    );
};

export default Dashboard;
