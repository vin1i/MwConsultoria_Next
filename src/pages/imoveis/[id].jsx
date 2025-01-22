import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";

const ImovelPage = () => {
  const { query } = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query.id) return;

    const fetchData = async () => {
      const docRef = doc(db, "properties", query.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProperty({ id: query.id, ...docSnap.data() });
      } else {
        console.error("Imóvel não encontrado");
      }
      setLoading(false);
    };

    fetchData();
  }, [query.id]);

  if (loading) return <p>Carregando...</p>;
  if (!property) return <p>Imóvel não encontrado.</p>;

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
    </div>
  );
};

export default ImovelPage;
