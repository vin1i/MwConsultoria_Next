import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import PropTypes from "prop-types";

const CloudinaryImage = ({
  publicId,
  width = 500,
  height = 500,
  alt = "Imagem não disponível",
}) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

  // Verificação se o Cloudinary Cloud Name está configurado
  if (!cloudName) {
    console.error(
      "Erro: Cloudinary Cloud Name não configurado. Verifique as variáveis de ambiente."
    );
    return (
      <p style={{ color: "red" }}>
        Erro: Configuração do Cloudinary ausente. Entre em contato com o suporte.
      </p>
    );
  }

  // Verificação se o publicId foi fornecido
  if (!publicId) {
    console.warn("Public ID não fornecido para o componente CloudinaryImage.");
    return (
      <img
        src="https://via.placeholder.com/500x500?text=Sem+Imagem"
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: "cover", borderRadius: "8px" }}
      />
    );
  }

  // Geração do URL do Cloudinary usando publicId
  const cld = new Cloudinary({ cloud: { cloudName } });
  const img = cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(width).height(height));

  return (
    <AdvancedImage
      cldImg={img}
      alt={alt}
      style={{
        width: typeof width === "string" ? width : `${width}px`,
        height: typeof height === "string" ? height : `${height}px`,
        objectFit: "cover",
        borderRadius: "8px",
      }}
    />
  );
};

CloudinaryImage.propTypes = {
  publicId: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
};

export default CloudinaryImage;
