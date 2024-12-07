import React from "react";

const HomePage = () => {
  return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 px-6 py-8 bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Título Principal */}
          <section className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
              Bienvenido a <span className="text-blue-600">MetAgro</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              La app que conecta agricultores, productores y proveedores para una colaboración más eficiente y sostenible.
            </p>
          </section>

          {/* Sección: Beneficios */}
          <section className="mb-12" data-aos="fade-right">
            <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
              Beneficios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Beneficio 1 */}
              <div
                  className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="bg-green-500 text-white p-4 rounded-full mb-4">
                  {/* Icono de mercado */}
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Acceso a nuevos mercados</h3>
                <p className="text-gray-600 text-center">
                  Conecta agricultores y proveedores con compradores en nuevos mercados.
                </p>
              </div>

              {/* Beneficio 2 */}
              <div
                  className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="bg-green-500 text-white p-4 rounded-full mb-4">
                  {/* Icono de sostenibilidad */}
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Sostenibilidad</h3>
                <p className="text-gray-600 text-center">
                  Fomenta prácticas sostenibles y comercio justo para todos.
                </p>
              </div>

              {/* Beneficio 3 */}
              <div
                  className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="bg-green-500 text-white p-4 rounded-full mb-4">
                  {/* Icono de ahorro */}
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10l4.5 4.5M19.5 6L15 10m4.5-4L10 6l4.5 4.5m0-9L15 10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Reducción de costos</h3>
                <p className="text-gray-600 text-center">
                  Reduce gastos operativos con nuestra red de conexiones confiables.
                </p>
              </div>
            </div>
          </section>

          {/* Sección: Testimonios */}
          <section className="mb-12" data-aos="zoom-in">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
              Testimonios
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonio 1 */}
              <div
                  className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="bg-blue-500 text-white p-4 rounded-full mb-4">
                  {/* Icono de usuario */}
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 3l7 7-7 7M12 3l7 7-7 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Juan Pérez</h3>
                <p className="italic text-gray-600 text-center">
                  "Gracias a Metagro, he conseguido proveedores confiables para mis cultivos."
                </p>
              </div>

              {/* Testimonio 2 */}
              <div
                  className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="bg-blue-500 text-white p-4 rounded-full mb-4">
                  {/* Icono de conexión */}
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7v4h2l5-7 5 14v-4h2m0 4h4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Ana López</h3>
                <p className="italic text-gray-600 text-center">
                  "Metagro es una herramienta imprescindible para mi negocio."
                </p>
              </div>

              {/* Testimonio 3 */}
              <div
                  className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="bg-blue-500 text-white p-4 rounded-full mb-4">
                  {/* Icono de comunidad */}
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 7l5 7h5m6-7l-5 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Carlos Ramírez</h3>
                <p className="italic text-gray-600 text-center">
                  "La conexión con otros agricultores ha sido excelente."
                </p>
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
