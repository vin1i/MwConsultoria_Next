import React, { useState, useEffect } from "react";
import { db } from "@/services/firebase/firebaseConfig";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import Card from "@/components/Card";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { Container, Sidebar, Content, CardsContainer } from "./styles";

export default function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [filters, setFilters] = useState({
    precoMinimo: 0,
    precoMaximo: 20000000,
    tipo: null,
    quartos: null,
    suites: null,
    banheiros: null,
    vagas: null,
    ordenacaoVenda: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null); // Track the last document for pagination
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 1; // Número de imóveis por página

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        console.log("Buscando imóveis com os filtros:", filters);

        let queryRef = collection(db, "properties");

        // Aplicando filtros
        if (filters.tipo) {
          console.log("Aplicando filtro de tipo:", filters.tipo);
          queryRef = query(queryRef, where("tipo", "==", filters.tipo));
        }

        if (filters.precoMinimo || filters.precoMaximo) {
          if (filters.precoMinimo) {
            queryRef = query(queryRef, where("valorVenda", ">=", filters.precoMinimo));
          }
          if (filters.precoMaximo) {
            queryRef = query(queryRef, where("valorVenda", "<=", filters.precoMaximo));
          }
          console.log("Aplicando filtro de preço entre:", filters.precoMinimo, "e", filters.precoMaximo);
        }

        if (filters.quartos > 0) {
          console.log("Aplicando filtro de quartos maior ou igual a:", filters.quartos);
          queryRef = query(queryRef, where("quartos", ">=", filters.quartos));
        }
        if (filters.suites > 0) {
          console.log("Aplicando filtro de suítes maior ou igual a:", filters.suites);
          queryRef = query(queryRef, where("suites", ">=", filters.suites));
        }
        if (filters.banheiros > 0) {
          console.log("Aplicando filtro de banheiros maior ou igual a:", filters.banheiros);
          queryRef = query(queryRef, where("banheiros", ">=", filters.banheiros));
        }
        if (filters.vagas > 0) {
          console.log("Aplicando filtro de vagas maior ou igual a:", filters.vagas);
          queryRef = query(queryRef, where("vagas", ">=", filters.vagas));
        }

        if (filters.ordenacaoVenda) {
          console.log("Aplicando filtro de ordenação por valor de venda:", filters.ordenacaoVenda);
          queryRef = query(queryRef, orderBy("valorVenda", filters.ordenacaoVenda));
        }

        // Paginação
        queryRef = query(queryRef, limit(ITEMS_PER_PAGE));

        if (lastVisible) {
          console.log("Paginação: Iniciando após o documento:", lastVisible.id);
          queryRef = query(queryRef, startAfter(lastVisible)); // Paginação após o último item
        }

        const querySnapshot = await getDocs(queryRef);

        console.log("Consulta executada. Número de documentos retornados:", querySnapshot.size);

        const listaImoveis = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Imóveis retornados:", listaImoveis);

        setImoveis(listaImoveis);
        setTotalPages(Math.ceil(querySnapshot.size / ITEMS_PER_PAGE));
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Atualiza o último documento para o startAfter
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    };

    fetchImoveis();
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    console.log("Filtros alterados:", newFilters);
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setCurrentPage(1); // Reseta para a primeira página ao aplicar novos filtros
  };

  return (
    <Container>
      <Sidebar>
        <Filters filters={filters} onFilterChange={handleFilterChange} />
      </Sidebar>

      <Content>
        <CardsContainer>
          {imoveis.map((imovel) => (
            <Card key={imovel.id} {...imovel} />
          ))}
        </CardsContainer>

        {/* Paginação */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)} // Atualiza a página ao clicar
        />
      </Content>
    </Container>
  );
}
