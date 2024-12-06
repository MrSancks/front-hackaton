import { useState, useEffect } from "react";

const Companias = () => {
  const [companias, setCompanias] = useState([]);  // Estado para almacenar las compañías
  const [loading, setLoading] = useState(true);  // Estado para controlar la carga
  const [error, setError] = useState(null);  // Estado para errores

  useEffect(() => {
    // Función para obtener las compañías desde el backend
    const fetchCompanias = async () => {
      const token = localStorage.getItem("token"); // Obtener el token del localStorage

      try {
        const response = await fetch("https://hackaton-back-production.up.railway.app/companies", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,  // Enviar el token en el header Authorization
            "Content-Type": "application/json",
          },
          credentials: "include", // Asegúrate de enviar las cookies si es necesario
        });

        if (!response.ok) {
          throw new Error("Error al obtener las compañías");
        }

        const data = await response.json();  // Parsear la respuesta JSON
        setCompanias(data);  // Establecer las compañías en el estado
      } catch (err) {
        setError(err.message);  // Si hay un error, guardar el mensaje en el estado
      } finally {
        setLoading(false);  // Cuando termine la solicitud, marcar como carga completa
      }
    };

    fetchCompanias();  // Llamar a la función al cargar el componente
  }, []);  // El arreglo vacío asegura que solo se ejecute una vez al montar el componente

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-gray-800">Compañías</h3>
      <p className="text-gray-600">Administra las compañías de tu red. Aquí puedes ver los detalles, agregar o editar.</p>
      
      {companias.length > 0 ? (
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <ul>
            {companias.map((compania) => (
              <li key={compania.id} className="mb-4">
                <h4 className="text-xl font-semibold text-gray-700">{compania.name}</h4>
                <p className="text-gray-500">{compania.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No hay compañías disponibles.</p>
      )}
    </div>
  );
};

export default Companias;
