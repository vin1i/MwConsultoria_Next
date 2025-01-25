import { useEffect, useState, useMemo } from "react";
import { db } from "@/services/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import RealEstateCard from "@/components/Card/RealEstateCard";
import Pagination from "@/components/Pagination";
import Filters from "@/components/Filters";
import { useLoading } from "@/context/LoadingContext";
import { getImoveis } from "@/services/firebase/firestoreService";
import { normalizeValues } from "@/utils/utils";
import filtersOptions from "@/data/FiltersOptions";

const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryBaseUrl = `https://res.cloudinary.com/${cloudinaryCloudName}`;
const ImoveisPage = () => {
  const [imoveis, setImoveis] = useState([]);
  const [filters, setFilters] = useState({
    tipo: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    precoMinimo: 100000,
    precoMaximo: 1000000,
  });

  const { setIsLoading, isLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(6);
  
  useEffect(() => {
    async function fetchImoveis() {
      setIsLoading(true); 
  
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        const listaImoveis = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setImoveis(listaImoveis);
      } catch (error) {
        console.error("Erro ao buscar imóveis:", error);
      } finally {
      
        setTimeout(() => {
          setIsLoading(false); 
        }, 1000); // 1000ms = 1 segundos
      }
    }

    fetchImoveis();
  }, [filters, setIsLoading]); 
  

  const filteredProperties = useMemo(() => {
    const sortedProperties = imoveis.filter((property) => {
   
      if (filters.tipo) {
        if (
          filters.tipo === "venda" &&
          property.tipo !== "venda" &&
          property.tipo !== "vendaLocacao"
        ) {
          return false;
        }
        if (
          filters.tipo === "locacao" &&
          property.tipo !== "locacao" &&
          property.tipo !== "vendaLocacao"
        ) {
          return false;
        }
        if (
          filters.tipo !== "venda" &&
          filters.tipo !== "locacao" &&
          filters.tipo !== property.tipo
        ) {
          return false;
        }
      }

    
      if (
        (filters.precoMinimo && property.valorVenda < filters.precoMinimo) ||
        (filters.precoMaximo && property.valorVenda > filters.precoMaximo)
      ) {
        return false;
      }

   
      if (filters.quartos && filters.quartos !== "Qualquer") {
        const quartosFilter = Number(filters.quartos.replace("+", ""));
        const quartosProperty = Number(property.quartos);
        if (
          filters.quartos.includes("+")
            ? quartosProperty < quartosFilter
            : quartosProperty !== quartosFilter
        ) {
          return false;
        }
      }

     
      if (filters.suites && filters.suites !== "Qualquer") {
        const suitesFilter = Number(filters.suites.replace("+", ""));
        const suitesProperty = Number(property.suites);
        if (
          filters.suites.includes("+")
            ? suitesProperty < suitesFilter
            : suitesProperty !== suitesFilter
        ) {
          return false;
        }
      }

     
      if (filters.banheiros && filters.banheiros !== "Qualquer") {
        const banheirosFilter = Number(filters.banheiros.replace("+", ""));
        const banheirosProperty = Number(property.banheiros);
        if (
          filters.banheiros.includes("+")
            ? banheirosProperty < banheirosFilter
            : banheirosProperty !== banheirosFilter
        ) {
          return false;
        }
      }

   
      if (filters.vagas && filters.banheiros !== "Qualquer") {
        const vagasFilter = Number(filters.vagas.replace("+", ""));
        const vagasProperty = Number(property.vagas);
        if (
          filters.vagas.includes("+")
            ? vagasProperty < vagasFilter
            : vagasProperty !== vagasFilter
        ) {
          return false;
        }
      }

      return true;
    })

      
    .sort((a, b) => a.valorVenda - b.valorVenda);

   
    if (filters.ordenacaoVenda === "asc") {
      return sortedProperties.sort((a, b) => a.valorVenda - b.valorVenda);
    }
    if (filters.ordenacaoVenda === "desc") {
      return sortedProperties.sort((a, b) => b.valorVenda - a.valorVenda);
    }
    if (filters.ordenacaoLocacao === "asc") {
      return sortedProperties.sort((a, b) => a.valorLocacao - b.valorLocacao);
    }
    if (filters.ordenacaoLocacao === "desc") {
      return sortedProperties.sort((a, b) => b.valorLocacao - a.valorLocacao);
    }
    if (filters.ordenacaoOutros === "asc") {
      return sortedProperties.sort((a, b) => a.vlCondominio - b.vlCondominio);
    }
    if (filters.ordenacaoOutros === "desc") {
      return sortedProperties.sort((a, b) => b.vlCondominio - a.vlCondominio);
    }

    return sortedProperties; 
  }, [imoveis, filters]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(3); // Telas menores (ex: smartphones)
      } else if (width < 1024) {
        setItemsPerPage(4); // Telas médias (ex: tablets)
      } else {
        setItemsPerPage(6); // Telas maiores (ex: desktops)
      }
    };
  
    // Atualizar quando o componente for montado
    updateItemsPerPage();
  
    // Listener para mudanças no tamanho da janela
    window.addEventListener("resize", updateItemsPerPage);
  
    // Cleanup para evitar problemas de performance
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);
  
  const currentProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProperties, currentPage, itemsPerPage]);

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mx-10 my-10 min-h-screen">

        <Filters filters={filters} onFilterChange={setFilters} filtersOptions={filtersOptions} />
    

      <div className="col-span-3 flex flex-col gap-4">
        <div className="grid justify-items-center grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {currentProperties.length === 0 ? (
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
                cloudinaryBaseUrl={cloudinaryBaseUrl}
                imagens={
                  imovel.imagens?.length > 0
                    ? imovel.imagens.map((img) =>
                        img.startsWith("http")
                          ? img
                          : `${cloudinaryBaseUrl}/image/upload/${img}`
                      )
                    : ["https://via.placeholder.com/300x200?text=Imagem+Indisponível"]
                }
                descricao={imovel.descricao}
                disponibilidade={imovel.disponibilidade}
              />
            ))
          )}
        </div>

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