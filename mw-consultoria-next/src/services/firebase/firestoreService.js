import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";

const propertyCollection = collection(db, "properties");

export const addImovel = async (imovelData) => {
  if (!imovelData || !imovelData.tp_imovel || !imovelData.ds_localizacao || !imovelData.vl_preco) {
    console.error("Dados do imóvel incompletos:", imovelData);
    return null;
  }

  if (typeof imovelData.vl_preco !== 'number' || imovelData.vl_preco <= 0) {
    console.error("Preço inválido:", imovelData.vl_preco);
    return null;
  }
  
  try {
    const docRef = await addDoc(propertyCollection, imovelData);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar imóvel:", error.message);
    throw new Error("Falha ao adicionar o imóvel. Verifique os dados e tente novamente.");
  }
};

export const getImoveis = async (lastVisibleDoc = null, pageSize = 10) => {
  try {
    let propertyQuery = query(propertyCollection, orderBy("nm_titulo"), limit(pageSize));
    
    if (lastVisibleDoc) {
      propertyQuery = query(propertyQuery, startAfter(lastVisibleDoc));
    }

    const querySnapshot = await getDocs(propertyQuery);
    const properties = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      tipo: doc.data().tp_imovel || 'Desconhecido',
      endereco: doc.data().ds_localizacao || 'Não informado',
      valor: doc.data().vl_preco || 0,
      vlCondominio: doc.data().vlCondominio || 0,
      vlIptu: doc.data().vlIptu || 0,
      quartos: doc.data().nr_quartos || 0,
      banheiros: doc.data().nr_banheiros || 0,
      vagas: doc.data().nr_vagas_garagem || 0,
      suites: doc.data().nr_suites || 0,
      metrosQuadrados: doc.data().nr_tamanho || 0,
      descricao: doc.data().ds_descricao || 'Sem descrição',
      disponibilidade: doc.data().st_disponibilidade || 'Indefinido',
      titulo: doc.data().nm_titulo || 'Sem título',
      imagens: doc.data().imagens || [],
      videos: doc.data().videos || [],
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { properties, lastVisible };
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error);
    throw error;
  }
};

export const getImovelById = async (id) => {
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Dados do imóvel:", data);
      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      console.error("Imóvel não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar imóvel:", error);
    throw error;
  }
};

export const updateImovel = async (id, updatedData) => {
  if (!updatedData || Object.keys(updatedData).length === 0) {
    console.error("Dados para atualização ausentes ou vazios:", updatedData);
    return;
  }

  try {
    const propertyRef = doc(db, "properties", id);
    await updateDoc(propertyRef, updatedData);
  } catch (error) {
    console.error("Erro ao atualizar imóvel:", error.message);
    throw new Error(`Falha ao atualizar o imóvel: ${error.message}`);
  }
};

export const deleteImovel = async (id) => {
  const confirmDelete = window.confirm("Você tem certeza que deseja excluir este imóvel?");
  if (!confirmDelete) {
    return;
  }

  try {
    const propertyRef = doc(db, "properties", id);
    await deleteDoc(propertyRef);
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error);
    throw error;
  }
};
