import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const OfferButton = ({ requestId, userId }) => {
  const [amount, setAmount] = useState(""); // Estado para cantidad
  const [price, setPrice] = useState(""); // Estado para precio
  const token = document.cookie; // Obtener token desde las cookies

  // Función para manejar el envío de la oferta
  const handleOffer = async () => {
    // Asegurar que amount y price sean números
    const parsedAmount = Number(amount);
    const parsedPrice = Number(price);

    // Validación de los campos para asegurar que sean números válidos
    if (!parsedAmount || !parsedPrice) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos o inválidos",
        text: "Por favor, ingrese valores válidos para la cantidad y el precio.",
      });
      return;
    }

    // Crear el objeto para la oferta
    const offerData = {
      requestId,
      userId,
      amount: parsedAmount, // Asegurarse de enviar el valor como número
      price: parsedPrice,   // Asegurarse de enviar el valor como número
    };

    try {
     console.log(offerData)
      const response = await axios.post(
        "https://hackaton-back-production.up.railway.app/offer",
        offerData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pasar el token de autenticación
          },
          withCredentials: true, // Mantener las cookies con la solicitud
        }
      );

      // Verificar si la respuesta es exitosa
      if (!response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Oferta enviada",
          text: "Tu oferta se ha enviado correctamente.",
        });
      } else {
        // Si ocurre un error en el servidor
        Swal.fire({
          icon: "error",
          title: "Error al enviar la oferta",
          text: "Hubo un problema al enviar la oferta. Inténtalo nuevamente.",
        });
      }
    } catch (error) {
      // Manejo de errores en caso de que falle la solicitud
      Swal.fire({
        icon: "error",
        title: "Error al enviar la oferta",
        text: "Hubo un problema al enviar la oferta. Inténtalo más tarde.",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Input para la cantidad */}
      <div className="flex flex-col">
        <label className="text-gray-600">Cantidad:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // Actualizar cantidad
          className="p-2 border border-gray-300 rounded"
          placeholder="Cantidad"
        />
      </div>

      {/* Input para el precio */}
      <div className="flex flex-col">
        <label className="text-gray-600">Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)} // Actualizar precio
          className="p-2 border border-gray-300 rounded"
          placeholder="Precio"
        />
      </div>

      {/* Botón para enviar la oferta */}
      <button
        onClick={handleOffer} // Llamar a la función handleOffer cuando se haga clic
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Hacer Oferta
      </button>
    </div>
  );
};

export default OfferButton;
