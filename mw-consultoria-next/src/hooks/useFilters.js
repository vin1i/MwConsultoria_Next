// import { useState, useMemo } from "react";

// const useFilters = (initialFilters, imoveis) => {
//   const [filters, setFilters] = useState(initialFilters);
//   const [sortOrder, setSortOrder] = useState({
//     ordenacaoVenda: "",
//     ordenacaoLocacao: "",
//     ordenacaoOutros: "",
//   });

//   const handleFilterChange = (newFilters) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       ...newFilters,
//     }));
//   };

//   const handleSortChange = (type, order) => {
//     setSortOrder((prevSortOrder) => ({
//       ...prevSortOrder,
//       [type]: order,
//     }));
//   };

//   // Função para aplicar a ordenação
//   const sortImoveis = (imoveisList) => {
//     let sortedImoveis = [...imoveisList];

//     if (sortOrder.ordenacaoVenda) {
//       sortedImoveis = sortedImoveis.sort((a, b) => {
//         return sortOrder.ordenacaoVenda === "asc"
//           ? a.valorVenda - b.valorVenda
//           : b.valorVenda - a.valorVenda;
//       });
//     }

//     if (sortOrder.ordenacaoLocacao) {
//       sortedImoveis = sortedImoveis.sort((a, b) => {
//         return sortOrder.ordenacaoLocacao === "asc"
//           ? a.valorLocacao - b.valorLocacao
//           : b.valorLocacao - a.valorLocacao;
//       });
//     }

//     if (sortOrder.ordenacaoOutros) {
//       sortedImoveis = sortedImoveis.sort((a, b) => {
//         return sortOrder.ordenacaoOutros === "asc"
//           ? a.vlCondominio - b.vlCondominio
//           : b.vlCondominio - a.vlCondominio;
//       });
//     }

//     return sortedImoveis;
//   };

//   // Lógica de filtragem dos imóveis
//   const filteredImoveis = useMemo(() => {
//     let filteredList = imoveis.filter((property) => {
//       if (filters.tipo && property.tipo !== filters.tipo) return false;
//       if (filters.quartos && property.quartos !== filters.quartos) return false;
//       if (filters.banheiros && property.banheiros !== filters.banheiros) return false;
//       if (filters.vagas && property.vagas !== filters.vagas) return false;
//       if (filters.precoMinimo && property.valorVenda < filters.precoMinimo) return false;
//       if (filters.precoMaximo && property.valorVenda > filters.precoMaximo) return false;
//       return true;
//     });

//     return sortImoveis(filteredList);
//   }, [imoveis, filters, sortOrder]);

//   return { filters, handleFilterChange, filteredImoveis, handleSortChange };
// };

// export default useFilters;
