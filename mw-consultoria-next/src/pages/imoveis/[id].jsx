import React from "react";
import ImobiDetails from "../../components/ImovelDetail";
import { doc, getDoc } from 'firebase/firestore'; // Certifique-se de importar getDoc
import { db } from '../../services/firebase/firebaseConfig'; 

export async function getServerSideProps({ params }) {
  const { id } = params;
  const docRef = doc(db, "properties", id); // Referência ao documento
  const docSnap = await getDoc(docRef); // Obtém o documento

  // Verifica se o documento existe
  if (!docSnap.exists()) return { notFound: true };

  // Mapeia os dados do documento para props
  const property = { id, ...docSnap.data() };
  return { props: { id, initialProperty: property } };
}

const ImovelPage = ({ id, initialProperty }) => (
  <ImobiDetails id={id} initialProperty={initialProperty} />
);

export default ImovelPage;
