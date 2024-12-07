import React from "react";

const HomePage = () => {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 px-6 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Título Principal */}
          <section className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
              Bienvenido a <span className="text-blue-600">Metagro</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              La app que conecta agricultores, productores y proveedores para una colaboración más eficiente y sostenible.
            </p>
          </section>

          {/* Sección: Beneficios */}
          <section className="mb-12" data-aos="fade-right">
            <div className="p-6 md:p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
                Beneficios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Beneficio 1 */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="bg-green-500 text-white p-3 rounded-full">
                    {/* Icono de mercado */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 7h18M3 10h18M5 21h14a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v15a1 1 0 001 1z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">
                    Facilita el acceso a nuevos mercados.
                  </p>
                </div>

                {/* Beneficio 2 */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="bg-green-500 text-white p-3 rounded-full">
                    {/* Icono de sostenibilidad */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v10l3-3m-6 0l3 3m4 6h-2v2h-4v-2H8a4 4 0 010-8h8a4 4 0 010 8z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">
                    Fomenta la sostenibilidad y el comercio justo.
                  </p>
                </div>

                {/* Beneficio 3 */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="bg-green-500 text-white p-3 rounded-full">
                    {/* Icono de ahorro */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8c1.657 0 3-1.567 3-3.5S13.657 1 12 1 9 2.567 9 4.5 10.343 8 12 8zm6 6h-1v5H7v-5H6a6 6 0 1112 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">
                    Reduce costos operativos.
                  </p>
                </div>

                {/* Beneficio 4 */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="bg-green-500 text-white p-3 rounded-full">
                    {/* Icono de confianza */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 2l1.386 3.382a1 1 0 00.95.618h3.566a1 1 0 01.588 1.81l-2.833 2.064a1 1 0 00-.364 1.118l1.386 3.382a1 1 0 01-1.528 1.19l-2.833-2.064a1 1 0 00-1.118 0l-2.833 2.064a1 1 0 01-1.528-1.19l1.386-3.382a1 1 0 00-.364-1.118L4.51 8.81a1 1 0 01.588-1.81h3.566a1 1 0 00.95-.618L12 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-medium">
                    Construye relaciones de confianza entre usuarios.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Testimonios */}
          <section className="mb-12" data-aos="zoom-in">
            <div className="p-6 md:p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
                Testimonios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Testimonio 1 */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="bg-blue-500 text-white p-3 rounded-full">
                    {/* Icono de agricultura */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 17v1m0-8v1m-4 6V5a1 1 0 011-1h2a1 1 0 011 1v11M16 17v1m0-8v1m-4 6V5a1 1 0 011-1h2a1 1 0 011 1v11"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium italic">
                      "Gracias a Metagro, he conseguido proveedores confiables para mis cultivos."
                    </p>
                    <p className="font-semibold text-gray-800 mt-4">- Juan Pérez</p>
                  </div>
                </div>

                {/* Testimonio 2 */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="bg-blue-500 text-white p-3 rounded-full">
                    {/* Icono de herramienta */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.325 4.317a4.143 4.143 0 011.76-.423h.83a4.143 4.143 0 014.143 4.142v.832a4.143 4.143 0 01-.423 1.759l-7.234 7.233a4.143 4.143 0 01-5.846-5.847l7.234-7.233z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium italic">
                      "Metagro es una herramienta imprescindible para mi negocio."
                    </p>
                    <p className="font-semibold text-gray-800 mt-4">- Ana López</p>
                  </div>
                </div>

                {/* Testimonio 3 */}
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="bg-blue-500 text-white p-3 rounded-full">
                    {/* Icono de comunidad */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.318 4.318a4 4 0 015.657 0L21 5.343l1.025-1.025a4 4 0 015.657 5.657L14.318 4.318zm2.121 2.121L7.05 16.809m6.36-1.29v.011m.001-8.233l-.002 8.233"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium italic">
                      "La conexión con otros agricultores ha sido excelente."
                    </p>
                    <p className="font-semibold text-gray-800 mt-4">- Carlos Ramírez</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Llamado a la Acción */}
          <section className="text-center" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              ¿Listo para unirte?
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
              Regístrate hoy y sé parte de la comunidad de Metagro.
            </p>
            <button
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
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
