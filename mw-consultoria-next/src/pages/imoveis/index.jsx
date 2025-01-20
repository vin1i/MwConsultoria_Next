import { useEffect, useState, useMemo } from "react";
import { db } from "@/services/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RealEstateCard from "@/components/Card/RealEstateCard";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Filters";
import filtersOptions from "@/data/FiltersOptions";

export default function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [filters, setFilters] = useState({
    precoMinimo: 0,
    precoMaximo: 20000000,
    ordenacaoVenda: "",
    ordenacaoLocacao: "",
    ordenacaoOutros: "",
    tipoNegocio: "",
    quartosMinimo: 0,
    quartosMaximo: 10,
    suitesMinimo: 0,
    suitesMaximo: 10,
    banheirosMinimo: 0,
    banheirosMaximo: 10,
    vagasMinimo: 0,
    vagasMaximo: 10,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    async function fetchImoveis() {
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        const listaImoveis = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setImoveis(listaImoveis);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      }
    }

    fetchImoveis();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredImoveis = useMemo(() => {
    let filtered = [...imoveis];
  
    // Aplicando os filtros individuais
    filtersOptions.forEach((option) => {
      const filterValue = filters[option.key];
  
      if (filterValue && option.key) {
        filtered = filtered.filter((property) => {
          if (Array.isArray(filterValue)) {
            return filterValue.includes(property[option.key]);
          }
  
          // Para filtros numéricos como quartos, suítes, banheiros e vagas
          if (
            ["quartos", "suites", "banheiros", "vagas"].includes(option.key)
          ) {
            if (filterValue === "5+") {
              return property[option.key] >= 5; // Verifica se é maior ou igual a 5
            }
  
            if (filterValue !== "") {
              return property[option.key] === parseInt(filterValue, 10); // Garante comparação numérica
            }
  
            return true; // Se o filtro não estiver aplicado, não filtra
          }
  
          return property[option.key] === filterValue; // Para outros tipos de filtros
        });
      }
    });
  
    // Filtro de preço
    filtered = filtered.filter(
      (property) =>
        property.valorVenda >= filters.precoMinimo &&
        property.valorVenda <= filters.precoMaximo
    );
  
    // Filtro de tipo de negócio (venda, locação, ambos)
    if (filters.tipoNegocio && filters.tipoNegocio !== "vendaLocacao") {
      filtered = filtered.filter(
        (property) => property.tipoNegocio === filters.tipoNegocio
      );
    } else if (filters.tipoNegocio === "vendaLocacao") {
      filtered = filtered.filter(
        (property) =>
          property.tipoNegocio === "venda" || property.tipoNegocio === "locacao"
      );
    }
  
    // Filtros de ordenação
    if (filters.ordenacaoVenda) {
      filtered.sort((a, b) =>
        filters.ordenacaoVenda === "asc"
          ? a.valorVenda - b.valorVenda
          : b.valorVenda - a.valorVenda
      );
    } else if (filters.ordenacaoLocacao) {
      filtered.sort((a, b) =>
        filters.ordenacaoLocacao === "asc"
          ? a.valorLocacao - b.valorLocacao
          : b.valorLocacao - a.valorLocacao
      );
    } else if (filters.ordenacaoOutros) {
      filtered.sort((a, b) =>
        filters.ordenacaoOutros === "asc"
          ? a.vlCondominio - b.vlCondominio
          : b.vlCondominio - a.vlCondominio
      );
    }
  
    return filtered;
  }, [imoveis, filters, filtersOptions]);
  

  const indexOfLastProperty = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProperty = indexOfLastProperty - ITEMS_PER_PAGE;
  const currentImoveis = filteredImoveis.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(filteredImoveis.length / ITEMS_PER_PAGE);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 min-h-screen">
      <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md mb-4 md:mb-0">
        <Filters filters={filters} onFilterChange={setFilters} />
      </div>

      <div className="col-span-3 flex flex-col gap-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Imóveis em Destaque</h1>
          <p className="mt-2 text-gray-600">Encontre o imóvel perfeito para você</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {currentImoveis.map((imovel) => (
            <RealEstateCard
              key={imovel.id}
              id={imovel.id}
              titulo={imovel.titulo}
              endereco={imovel.endereco}
              valorVenda={imovel.valorVenda ?? 0} // Handle potential null values
              vlCondominio={imovel.vlCondominio ?? 0}
              vlIptu={imovel.vlIptu ?? 0}
              imagens={imovel.imagens ?? []}
              videos={imovel.videos ?? []}
              quartos={imovel.quartos ?? 0}
              banheiros={imovel.banheiros ?? 0}
              vagas={imovel.vagas ?? 0}
              metrosQuadrados={imovel.metrosQuadrados ?? 0}
              suites={imovel.suites ?? 0}
              descricao={imovel.descricao ?? ""}
              disponibilidade={imovel.disponibilidade ?? "unknown"}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

