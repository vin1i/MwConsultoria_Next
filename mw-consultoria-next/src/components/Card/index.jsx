// import React, { useEffect, useState, useMemo } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/services/firebase/firebaseConfig";
// import RealEstateCard from "./RealEstateCard";
// import Pagination from "@/components/Pagination";
// import Filters from "@/components/Filters"; // Importando o componente de filtros

// /**
//  * Página de listagem de imóveis em destaque.
//  * 
//  * Renderiza uma lista de imóveis em destaque com paginação e filtros.
//  * 
//  * @returns {React.ReactElement} Elemento JSX da página.
//  */
// const Index = () => {
//   const [properties, setProperties] = useState([]); // Estado para armazenar os imóveis
//   const [filters, setFilters] = useState({
//     precoMinimo: 0,
//     precoMaximo: 20000000,
//     ordenacaoVenda: "",
//     ordenacaoLocacao: "",
//     ordenacaoOutros: "",
//   }); // Estado para armazenar os filtros
//   const [currentPage, setCurrentPage] = useState(1); // Página atual
//   const ITEMS_PER_PAGE = 6; // Número de imóveis por página

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "properties"));
//         const propertiesList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         // Atualiza o estado com todos os imóveis
//         setProperties(propertiesList);
//       } catch (error) {
//         console.error("Erro ao buscar imóveis:", error);
//       }
//     };

//     fetchProperties();
//   }, []); // A dependência vazia garante que o efeito execute apenas uma vez

//   const handlePageChange = (page) => {
//     setCurrentPage(page); // Atualiza a página atual
//   };

//   // Filtros aplicados à lista de imóveis
//   const filteredProperties = useMemo(() => {
//     let filtered = [...properties];

//     // Filtro de preço
//     filtered = filtered.filter(
//       (property) =>
//         property.valorVenda >= filters.precoMinimo &&
//         property.valorVenda <= filters.precoMaximo
//     );

//     // Filtros de ordenação
//     if (filters.ordenacaoVenda) {
//       filtered.sort((a, b) => {
//         return filters.ordenacaoVenda === "asc"
//           ? a.valorVenda - b.valorVenda
//           : b.valorVenda - a.valorVenda;
//       });
//     }

//     return filtered;
//   }, [properties, filters]); // Atualiza sempre que os imóveis ou filtros mudam

//   // Cálculos de paginação
//   const indexOfLastProperty = currentPage * ITEMS_PER_PAGE;
//   const indexOfFirstProperty = indexOfLastProperty - ITEMS_PER_PAGE;
//   const currentProperties = filteredProperties.slice(
//     indexOfFirstProperty,
//     indexOfLastProperty
//   );

//   const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

//   return (
//     <div className="min-h-screen bg-secondary p-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-12 text-center">
//           <h1 className="text-4xl font-bold text-primary">Imóveis em Destaque</h1>
//           <p className="mt-2 text-gray-600">Encontre o imóvel perfeito para você</p>
//         </div>

//         {/* Filtros */}
//         <Filters filters={filters} onFilterChange={setFilters} />

//         {/* Listagem de imóveis */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {currentProperties.map((property) => (
//             <RealEstateCard
//               key={property.id}
//               id={property.id}
//               titulo={property.titulo}
//               endereco={property.endereco}
//               valorVenda={property.valorVenda}
//               vlCondominio={property.vlCondominio}
//               vlIptu={property.vlIptu}
//               imagens={property.imagens}
//               videos={property.videos}
//               quartos={property.quartos}
//               banheiros={property.banheiros}
//               vagas={property.vagas}
//               metrosQuadrados={property.metrosQuadrados}
//               suites={property.suites}
//               descricao={property.descricao}
//               disponibilidade={property.disponibilidade}
//             />
//           ))}
//         </div>

//         {/* Paginação */}
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default Index;
