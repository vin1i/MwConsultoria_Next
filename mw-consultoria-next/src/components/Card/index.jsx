import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/firebaseConfig";
import RealEstateCard from "./RealEstateCard";
import Pagination from "@/components/Pagination";

/**
 * Página de listagem de imóveis em destaque.
 * 
 * Renderiza uma lista de imóveis em destaque com paginação.
 * 
 * @returns {React.ReactElement} Elemento JSX da página.
 */
const Index = () => {
  const [properties, setProperties] = useState([]); // Estado para armazenar os imóveis
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const ITEMS_PER_PAGE = 5; // 5 imóveis por página

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        const propertiesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Atualiza o estado com todos os imóveis
        setProperties(propertiesList);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    };

    fetchProperties();
  }, []); // A dependência vazia garante que o efeito execute apenas uma vez

  const handlePageChange = (page) => {
    setCurrentPage(page); // Atualiza a página atual
  };

  // Calcula o índice de início e fim dos imóveis a serem exibidos na página atual
  const indexOfLastProperty = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProperty = indexOfLastProperty - ITEMS_PER_PAGE;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE); // Total de páginas

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary">Imóveis em Destaque</h1>
          <p className="mt-2 text-gray-600">Encontre o imóvel perfeito para você</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentProperties.map((property) => (
            <RealEstateCard
              key={property.id}
              id={property.id}
              titulo={property.titulo}
              endereco={property.endereco}
              valorVenda={property.valorVenda}
              vlCondominio={property.vlCondominio}
              vlIptu={property.vlIptu}
              imagens={property.imagens}
              videos={property.videos}
              quartos={property.quartos}
              banheiros={property.banheiros}
              vagas={property.vagas}
              metrosQuadrados={property.metrosQuadrados}
              suites={property.suites}
              descricao={property.descricao}
              disponibilidade={property.disponibilidade}
            />
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default Index;
