import React from "react";


const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 px-6 py-8 bg-gray-50">
        {/* Título Principal */}
        <section
          className="text-center mb-12"
          data-aos="fade-up"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Bienvenido a Metagro
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La app que conecta agricultores, productores y proveedores para una colaboración más eficiente y sostenible.
          </p>
        </section>

        {/* Sección: Beneficios */}
        <section className="mb-12" data-aos="fade-right">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Beneficios
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Facilita el acceso a nuevos mercados.</li>
              <li>Fomenta la sostenibilidad y el comercio justo.</li>
              <li>Reduce costos operativos.</li>
              <li>Construye relaciones de confianza entre usuarios.</li>
            </ul>
          </div>
        </section>

        {/* Sección: Testimonios */}
        <section className="mb-12" data-aos="zoom-in">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
              Testimonios
            </h2>
            <p className="text-gray-700 mb-6">
              Conoce lo que nuestros usuarios dicen sobre Metagro.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonio 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="italic text-gray-600">
                  "Gracias a Metagro, he conseguido proveedores confiables para mis cultivos."
                </p>
                <p className="font-semibold text-gray-800 mt-4">- Juan Pérez</p>
              </div>
              {/* Testimonio 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="italic text-gray-600">
                  "Metagro es una herramienta imprescindible para mi negocio."
                </p>
                <p className="font-semibold text-gray-800 mt-4">- Ana López</p>
              </div>
              {/* Testimonio 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="italic text-gray-600">
                  "La conexión con otros agricultores ha sido excelente."
                </p>
                <p className="font-semibold text-gray-800 mt-4">- Carlos Ramírez</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección: Llamado a la Acción */}
        <section className="text-center" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Listo para unirte?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Regístrate hoy y sé parte de la comunidad de Metagro.
          </p>
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            onClick={() => window.location.href = "/register"}
          >
            Regístrate ahora
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
