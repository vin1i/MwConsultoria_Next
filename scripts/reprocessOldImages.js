import { dbAdmin } from "../src/services/firebase/firebaseAdminConfig.js";

function transformUrl(oldUrl) {
  const [beforeUpload, afterUpload] = oldUrl.split("/upload/");
  const transformation = "c_scale,w_1200,q_auto,f_auto,l_opreb9q06mnwbxsqkkey,g_north_east,x_20,y_20,w_150";
  return `${beforeUpload}/upload/${transformation}/${afterUpload}`;
}

async function reprocessOldImages() {
  try {
    // 1. Buscar todos os docs da coleção "properties" usando dbAdmin
    const snapshot = await dbAdmin.collection("properties").get();

    const updatePromises = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const oldImagens = data.imagens || [];
      const newImagens = oldImagens.map((url) => transformUrl(url));

      // Se também tiver campo "fotos":
      const oldFotos = data.fotos || [];
      const newFotos = oldFotos.map((url) => transformUrl(url));

      const updatedData = {
        ...data,
        imagens: newImagens,
        fotos: newFotos,
      };

      updatePromises.push(
        dbAdmin.collection("properties").doc(doc.id).update(updatedData)
      );
    });

    await Promise.all(updatePromises);
    console.log("Reprocessamento concluído!");
  } catch (error) {
    console.error("Erro ao reprocessar URLs antigas:", error);
  }
}

reprocessOldImages();
