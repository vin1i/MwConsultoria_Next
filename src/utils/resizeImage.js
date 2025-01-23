import imageCompression from "browser-image-compression";

/**
 * Aqui é pra redimensionar a imagem, mas so criei esse arquivo, não importei em nenhum lugar.
 * @param {File} file - O arquivo de imagem a ser redimensionado.
 * @returns {Promise<File>} - O arquivo de imagem redimensionado.
 */
export const resizeImage = async (file) => {
  const options = {
    maxSizeMB: 1, // Tamanho máximo de 1MB
    maxWidthOrHeight: 1200, // Largura ou altura máxima de 1200px
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Erro ao redimensionar imagem:", error);
    throw error;
  }
};
