export const uploadImagesToCloudinary = async (files) => {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!uploadPreset || !cloudName) {
    console.error("Cloudinary upload preset ou cloud name não configurados");
    return [];
  }

  const filesArray = Array.isArray(files) ? files : [files];

  const uploadPromises = filesArray.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();

      // marca d'água
      const finalUrl = applyWatermark(data.secure_url);
      console.log("URL antes do watermark:", data.secure_url);
      console.log("URL final com watermark e otimização:", finalUrl);

      return finalUrl;
    } catch (error) {
      console.error("Erro ao fazer upload para o Cloudinary:", error);
      throw error;
    }
  });

  return await Promise.all(uploadPromises);
};

const applyWatermark = (originalUrl) => {
  console.log("applyWatermark foi chamado para URL:", originalUrl);

  /**
   * Transformações unificadas em um só passo:
   *  - c_scale,w_800    => Redimensiona para largura máxima de 800px
   *  - c_scale,h_600    => Redimensiona para altura máxima de 600px
   *  - q_auto,f_auto     => Qualidade e formato automáticos
   *  - l_rlewvaht7dzwcx0ovkeq => Layer (l_) da sua marca d’água (public_id)
   *  - g_north_east,x_20,y_20,w_150 => Posição (Norte-Leste), offsets e largura da marca
   */
  const transformation = `c_scale,w_800,h_600,f_auto/l_rlewvaht7dzwcx0ovkeq,g_north_east,x_20,y_20,w_150`;
  

  // Separa a URL em duas partes: antes e depois de '/upload/'
  const [beforeUpload, afterUpload] = originalUrl.split("/upload/");

  // Reconstrói a URL com todas as transformações unificadas
  const finalUrl = `${beforeUpload}/upload/${transformation}/${afterUpload}`;

  console.log("URL final (marc d'água + otimização ):", finalUrl);

  return finalUrl;
};
