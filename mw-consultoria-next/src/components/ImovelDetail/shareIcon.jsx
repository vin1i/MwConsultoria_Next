import React, { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const ShareIcon = ({ id }) => {
  const [notyf, setNotyf] = useState(null);

  // Verificar se o ID é válido antes de construir o link
  if (!id) {
    return null;
  }

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://7226-2804-29b8-51af-3bc0-7ce6-e21d-f5fb-ddf9.ngrok-free.app"
      : "https://www.mwconsultoriaimobiliaria.com.br";

  const link = `${baseUrl}/imoveis/${id}`;

  useEffect(() => {
    // Instanciar o Notyf apenas no cliente
    const notyfInstance = new Notyf();
    setNotyf(notyfInstance);
  }, []);

  const copyLink = () => {
    if (notyf) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          notyf.success("Link copiado com sucesso!");
        })
        .catch(() => {
          notyf.error("Falha ao copiar o link. Tente novamente.");
        });
    }
  };

  return (
    <button
      onClick={copyLink}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#555",
        fontSize: "20px",
        marginLeft: "10px",
        marginTop: "5px",
      }}
      aria-label="Compartilhar"
      title="Compartilhar"
    >
      <FaShareAlt />
    </button>
  );
};

export default ShareIcon;
