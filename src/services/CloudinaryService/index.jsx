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
      return applyWatermark(data.secure_url);
    } catch (error) {
      console.error("Erro ao fazer upload para o Cloudinary:", error);
      throw error;
    }
  });

  return await Promise.all(uploadPromises);
};

const applyWatermark = (url) => {
  // redimensionamento das imagens e marca d'água
  const transformation = `c_scale,w_800,h_600,f_auto/l_opreb9q06mnwbxsqkkey,g_north_east,x_20,y_20,w_150`;
  const parts = url.split("/upload/");
  return `${parts[0]}/upload/${transformation}/${parts[1]}`;
};


