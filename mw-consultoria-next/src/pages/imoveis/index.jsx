import { useEffect, useState, useMemo } from "react";
import { db } from "@/services/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Card from "@/components/Card";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { Container, Sidebar, Content, CardsContainer } from "./styles";

// Filtro de opções (similar ao do componente antigo)
const filterOptions = [
  {
    id: "tipo",
    label: "Tipo de Negócio",
    key: "tipo",
    options: [
      { value: "", label: "Todos" },
      { value: "venda", label: "Venda" },
      { value: "locacao", label: "Locação" },
      { value: "vendaLocacao", label: "Venda e Locação" },
    ],
  },
  {
    id: "quartos",
    label: "Quartos",
    key: "quartos",
    options: [
      { value: "", label: "Qualquer" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5+", label: "5+" },
    ],
  },
  {
    id: "banheiros",
    label: "Banheiros",
    key: "banheiros",
    options: [
      { value: "", label: "Qualquer" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5+", label: "5+" },
    ],
  },
  {
    id: "vagas",
    label: "Vagas",
    key: "vagas",
    options: [
      { value: "", label: "Qualquer" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5+", label: "5+" },
    ],
  },
  {
    id: "precoMinimo",
    label: "Preço Mínimo",
    key: "precoMinimo",
    options: [
      { value: "", label: "Qualquer" },
      { value: "100000", label: "R$100.000" },
      { value: "200000", label: "R$200.000" },
      { value: "500000", label: "R$500.000" },
    ],
  },
  {
    id: "precoMaximo",
    label: "Preço Máximo",
    key: "precoMaximo",
    options: [
      { value: "", label: "Qualquer" },
      { value: "500000", label: "R$500.000" },
      { value: "1000000", label: "R$1.000.000" },
      { value: "2000000", label: "R$2.000.000" },
    ],
  },
];
export default function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    precoMinimo: "",
    precoMaximo: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        const listaImoveis = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImoveis(listaImoveis);
        setTotalPages(Math.ceil(listaImoveis.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    }

    fetchImoveis();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredImoveis = useMemo(() => {
    return imoveis.filter((property) => {
      if (filters.tipo && property.tipo !== filters.tipo) {
        return false;
      }
      if (filters.quartos && property.quartos !== filters.quartos) {
        return false;
      }
      if (filters.banheiros && property.banheiros !== filters.banheiros) {
        return false;
      }
      if (filters.vagas && property.vagas !== filters.vagas) {
        return false;
      }
      if (filters.precoMinimo && property.valorVenda < filters.precoMinimo) {
        return false;
      }
      if (filters.precoMaximo && property.valorVenda > filters.precoMaximo) {
        return false;
      }
      return true;
    });
  }, [imoveis, filters]);

  const sortedProperties = useMemo(() => {
    let sorted = [...filteredImoveis];

    // Ordenação por venda
    if (filters.ordenacaoVenda) {
      sorted = sorted.sort((a, b) => {
        const valorVendaA = a.valorVenda || 0;
        const valorVendaB = b.valorVenda || 0;
        return filters.ordenacaoVenda === "asc" ? valorVendaA - valorVendaB : valorVendaB - valorVendaA;
      });
    }

    // Ordenação por locação
    if (filters.ordenacaoLocacao) {
      sorted = sorted.sort((a, b) => {
        const valorLocacaoA = a.valorLocacao || 0;
        const valorLocacaoB = b.valorLocacao || 0;
        return filters.ordenacaoLocacao === "asc" ? valorLocacaoA - valorLocacaoB : valorLocacaoB - valorLocacaoA;
      });
    }

    // Ordenação por condomínio
    if (filters.ordenacaoOutros) {
      sorted = sorted.sort((a, b) => {
        const vlCondominioA = a.vlCondominio || 0;
        const vlCondominioB = b.vlCondominio || 0;
        return filters.ordenacaoOutros === "asc" ? vlCondominioA - vlCondominioB : vlCondominioB - vlCondominioA;
      });
    }

    return sorted;
  }, [filteredImoveis, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Sidebar>
        <Filters filters={filters} onFilterChange={handleFilterChange} filterOptions={filterOptions} />
      </Sidebar>

      <Content>
        <CardsContainer>
          {sortedProperties
            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
            .map((imovel) => (
              <Card key={imovel.id} {...imovel} />
            ))}
        </CardsContainer>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Content>
    </Container>
  );
}
