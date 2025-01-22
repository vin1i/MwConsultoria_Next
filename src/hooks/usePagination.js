// import { useState, useMemo } from 'react';

// /**
//  * Hook de paginação que gerencia a lógica de mudança de página e controle de imóveis exibidos por página.
//  * 
//  * @param {Array} items Lista de itens a serem paginados.
//  * @param {number} itemsPerPage Quantidade de itens a serem exibidos por página.
//  * @returns {Object} Um objeto com informações e funções para controle de paginação.
//  */
// const usePagination = (items, itemsPerPage = 5) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   // Verifica se items é um array válido antes de calcular o total de páginas
//   const totalPages = useMemo(() => {
//     if (Array.isArray(items)) {
//       return Math.ceil(items.length / itemsPerPage);
//     }
//     return 1; // Retorna 1 se `items` não for um array válido
//   }, [items, itemsPerPage]);

//   // Calcula os itens da página atual, com verificação de items ser válido
//   const currentItems = useMemo(() => {
//     if (Array.isArray(items)) {
//       const indexOfLastItem = currentPage * itemsPerPage;
//       const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//       return items.slice(indexOfFirstItem, indexOfLastItem);
//     }
//     return []; // Retorna um array vazio se `items` não for um array válido
//   }, [items, currentPage, itemsPerPage]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return {
//     currentPage,
//     totalPages,
//     currentItems,
//     handlePageChange,
//   };
// };

// export default usePagination;
