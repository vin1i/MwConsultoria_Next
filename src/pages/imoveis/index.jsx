import { useEffect, useState, useMemo } from "react";
import { db } from "@/services/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RealEstateCard from "@/components/Card/RealEstateCard";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Filters";
import { useLoading } from "@/context/LoadingContext";
import filtersOptions from "@/data/FiltersOptions";

const ImoveisPage = () => {
  const [imoveis, setImoveis] = useState([]); // Estado para armazenar os imóveis
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    precoMinimo: 100000,
    precoMaximo: 1000000,
  }); // Estado para os filtros
  const { setIsLoading, isLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 1. Carregar os imóveis no cliente (CSR)
  useEffect(() => {
    const fetchImoveis = async () => {
      setIsLoading(true); // Exibir indicador de carregamento
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        const listaImoveis = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImoveis(listaImoveis); // Atualizar os imóveis
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      } finally {
        setIsLoading(false); // Ocultar indicador de carregamento
      }
    };

    fetchImoveis();
  }, []); // Apenas ao montar o componente

  // 2. Filtrar e ordenar imóveis com useMemo
  const filteredProperties = useMemo(() => {
    return imoveis
      .filter((property) => {
        // Tipo de negócio
        if (filters.tipo && property.tipo !== filters.tipo) return false;

        // Filtros de preço, quartos, banheiros, etc.
        if (filters.precoMinimo && property.valorVenda < filters.precoMinimo) return false;
        if (filters.precoMaximo && property.valorVenda > filters.precoMaximo) return false;

        return true; // Se passar em todos os filtros
      })
      .sort((a, b) => a.valorVenda - b.valorVenda); // Ordenar por preço (padrão)
  }, [imoveis, filters]);

  // 3. Implementar paginação
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const currentProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 min-h-screen">
      {/* Sidebar com filtros */}
      <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md mb-4 md:mb-0">
        <Filters filters={filters} onFilterChange={setFilters} filtersOptions={filtersOptions} />
      </div>

      {/* Área de imóveis */}
      <div className="col-span-3 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {isLoading ? (
            <p>Carregando imóveis...</p>
          ) : currentProperties.length === 0 ? (
            <p>Nenhum imóvel encontrado com os filtros aplicados.</p>
          ) : (
            currentProperties.map((imovel) => (
              <RealEstateCard
                key={imovel.id}
                id={imovel.id}
                titulo={imovel.titulo}
                tipo={imovel.tipo}
                endereco={imovel.endereco}
                valorVenda={imovel.valorVenda}
                valorLocacao={imovel.valorLocacao}
                vlCondominio={imovel.vlCondominio}
                vlIptu={imovel.vlIptu}
                quartos={Number(imovel.quartos)}
                banheiros={Number(imovel.banheiros)}
                vagas={Number(imovel.vagas)}
                metrosQuadrados={Number(imovel.metrosQuadrados)}
                suites={Number(imovel.suites)}
                imagens={imovel.imagens || []}
                descricao={imovel.descricao}
                disponibilidade={imovel.disponibilidade}
              />
            ))
          )}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center w-full py-4 mt-8 sm:py-2 sm:mt-4 xs:py-1 xs:text-sm">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImoveisPage;
