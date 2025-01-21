// import React from "react";
// import ImobiDetails from "../../components/ImovelDetail";
// import { doc, getDoc } from 'firebase/firestore'; // Certifique-se de importar getDoc
// import { db } from '../../services/firebase/firebaseConfig'; 

// export async function getServerSideProps({ params }) {
//   const { id } = params;
//   const docRef = doc(db, "properties", id); // Referência ao documento
//   const docSnap = await getDoc(docRef); // Obtém o documento

//   // Verifica se o documento existe
//   if (!docSnap.exists()) return { notFound: true };

//   // Mapeia os dados do documento para props
//   const property = { id, ...docSnap.data() };
//   return { props: { id, initialProperty: property } };
// }

// const ImovelPage = ({ id, initialProperty }) => (
//   <ImobiDetails id={id} initialProperty={initialProperty} />
// );

// export default ImovelPage;
import React from "react";
import ImobiDetails from "../../components/ImovelDetail";
import { doc, getDoc, getDocs, collection } from "firebase/firestore"; // Incluindo getDocs para buscar IDs
import { db } from "../../services/firebase/firebaseConfig";

export async function getStaticPaths() {
  // Busca todos os documentos da coleção para gerar os caminhos
  const querySnapshot = await getDocs(collection(db, "properties"));
  const paths = querySnapshot.docs.map((doc) => ({
    params: { id: doc.id }, // Define os parâmetros dinâmicos
  }));

  return { paths, fallback: false }; // fallback: false significa que outros IDs vão gerar 404
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const docRef = doc(db, "properties", id); // Referência ao documento
  const docSnap = await getDoc(docRef); // Obtém o documento

  if (!docSnap.exists()) {
    return { notFound: true }; // Retorna 404 se o documento não existir
  }

  const property = { id, ...docSnap.data() }; // Mapeia os dados
  return {
    props: { id, initialProperty: property }, // Passa os dados como props
  };
}

const ImovelPage = ({ id, initialProperty }) => (
  <ImobiDetails id={id} initialProperty={initialProperty} />
);

export default ImovelPage;
