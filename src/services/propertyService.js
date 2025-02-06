import { db } from "../services/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { uploadImagesToCloudinary } from "../services/CloudinaryService/index";

const propertyCollection = collection(db, "properties");

export const addProperty = async (propertyData) => {
  try {
    const imagesToUpload = propertyData.imagens.filter(
      (img) => img instanceof File
    );

    const uploadedImageUrls = imagesToUpload.length
      ? await uploadImagesToCloudinary(imagesToUpload)
      : [];

    const allImageUrls = [
      ...propertyData.imagens.filter((img) => typeof img === "string"),
      ...uploadedImageUrls,
    ];

    const newPropertyData = {
      ...propertyData,
      imagens: allImageUrls,
      vlCondominio: propertyData.vlCondominio || 0,
      vlIptu: propertyData.vlIptu || 0,
      valorVenda: propertyData.valorVenda || 0,
      valorLocacao: propertyData.valorLocacao || 0,
      dt_criacao: new Date().toISOString(),
    };

    const docRef = await addDoc(propertyCollection, newPropertyData);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar imóvel:", error.message);
    throw new Error("Erro ao adicionar imóvel: " + error.message);
  }
};

export const getImoveis = async () => {
  try {
    const querySnapshot = await getDocs(propertyCollection);
    const imoveis = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        tipo: data.tipo || "Indefinido",
        endereco: data.endereco || "Não informado",
        valorVenda: data.valorVenda || 0,
        valorLocacao: data.valorLocacao || 0,
        condominio: data.vlCondominio || 0,
        vlIptu: data.vlIptu || 0,
        quartos: data.quartos || 0,
        banheiros: data.banheiros || 0,
        vagas: data.vagas || 0,
        suites: data.suites || 0,
        metrosQuadrados: data.metrosQuadrados || 0,
        descricao: data.descricao || "Não informada",
        disponibilidade: data.disponibilidade || "Não informado",
        titulo: data.titulo || "Sem título",
        imagens: data.imagens || [],
        videos: data.videos || [],
        dt_criacao: data.dt_criacao || "",
      };
    });
    return imoveis;
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error.message);
    throw error;
  }
};

export const updateImovel = async (id, updatedData) => {
  try {
    const propertyRef = doc(db, "properties", id);

    const updatedPropertyData = {
      ...updatedData,
      vlCondominio: updatedData.vlCondominio || 0,
      vlIptu: updatedData.vlIptu || 0,
      valorVenda: updatedData.valorVenda || 0,
      valorLocacao: updatedData.valorLocacao || 0,
    };

    await updateDoc(propertyRef, updatedPropertyData);
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error.message);
    throw error;
  }
};

export const deleteImovel = async (id) => {
  try {
    const propertyRef = doc(db, "properties", id);
    await deleteDoc(propertyRef);
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error.message);
    throw error;
  }
};

const normalizeImageUrls = (images) => {
  return images.map((img) =>
    img.replace(
      /(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)+/,
      "https://res.cloudinary.com/dsioklbbq/image/upload/f_auto,q_auto/"
    )
  );
};

export const loadProperties = async () => {
  try {
    const response = await fetch("/api/properties");
    const properties = await response.json();

    return properties.map((property) => ({
      ...property,
      imagens: normalizeImageUrls(property.imagens || []),
    }));
  } catch (error) {
    console.error("Erro ao carregar propriedades:", error);
    throw error;
  }
};
