import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase/firebaseConfig";

const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    precoMinimo: "",
    precoMaximo: "",
    ordenacaoVenda: "",
    ordenacaoLocacao: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Fetch inicial das propriedades
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        const propertiesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propertiesList);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    };
    fetchProperties();
  }, []);

  // Aplicação de filtros
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.tipo && property.tipo !== filters.tipo) return false;
      if (filters.quartos && property.quartos !== parseInt(filters.quartos)) return false;
      if (filters.banheiros && property.banheiros !== parseInt(filters.banheiros)) return false;
      if (filters.vagas && property.vagas !== parseInt(filters.vagas)) return false;
      if (filters.precoMinimo && property.valorVenda < parseFloat(filters.precoMinimo)) return false;
      if (filters.precoMaximo && property.valorVenda > parseFloat(filters.precoMaximo)) return false;
      return true;
    });
  }, [properties, filters]);

  // Ordenação
  const sortedProperties = useMemo(() => {
    let sorted = [...filteredProperties];
    if (filters.ordenacaoVenda) {
      sorted.sort((a, b) =>
        filters.ordenacaoVenda === "asc"
          ? a.valorVenda - b.valorVenda
          : b.valorVenda - a.valorVenda
      );
    } else if (filters.ordenacaoLocacao) {
      sorted.sort((a, b) =>
        filters.ordenacaoLocacao === "asc"
          ? a.valorLocacao - b.valorLocacao
          : b.valorLocacao - a.valorLocacao
      );
    }
    return sorted;
  }, [filteredProperties, filters]);

  // Paginação
  const totalPages = Math.ceil(sortedProperties.length / ITEMS_PER_PAGE);
  const currentProperties = useMemo(() => {
    const start = (currentPage - 5) + ITEMS_PER_PAGE ;
    const end = start + ITEMS_PER_PAGE;
    return sortedProperties.slice(start, end);
  }, [sortedProperties, currentPage]);

  // Ajusta a página atual se necessário
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Redefine a página ao aplicar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return {
    properties: currentProperties,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    totalPages,
  };
};

export default useProperties;
