import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const OfferDecision = ({ offerId, requestId, onDecisionMade }) => {
  const [loading, setLoading] = useState(false);

  const handleDecision = async (status) => {
    try {
      setLoading(true);

      const token = document.cookie;
      const response = await axios.put(
        `https://hackaton-back-production.up.railway.app/offer/${requestId}/${offerId}`, // Actualizado con requestId y offerId
        {
          offerId,
          requestId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Oferta ${status === "aceptada" ? "aceptada" : "rechazada"}`,
          text: "La decisión se ha registrado con éxito.",
        });
        onDecisionMade(); // Llama a un callback para actualizar la UI principal si es necesario
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al procesar la solicitud",
        text: "Hubo un problema al enviar tu decisión. Inténtalo más tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleDecision("aceptada")}
        disabled={loading}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
      >
        Aceptar
      </button>
      <button
        onClick={() => handleDecision("rechazada")}
        disabled={loading}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
      >
        Rechazar
      </button>
    </div>
  );
};

export default OfferDecision;
