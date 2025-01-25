import React from "react";
import ImobiDetails from "../../components/ImovelDetail";
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../../services/firebase/firebaseConfig'; 

export async function getServerSideProps({ params }) {
  const { id } = params;
  const docRef = doc(db, "properties", id); 
  const docSnap = await getDoc(docRef); 


  if (!docSnap.exists()) return { notFound: true };

  
  const property = { id, ...docSnap.data() };
  return { props: { id, initialProperty: property } };
}

const ImovelPage = ({ id, initialProperty }) => (
  <ImobiDetails id={id} initialProperty={initialProperty} />
);

export default ImovelPage;