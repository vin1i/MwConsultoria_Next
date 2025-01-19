import React from "react";
import { PageButton, PaginationContainer } from "./styles";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (currentPage > totalPages - 3) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pageNumbers.map((page, index) => (
      <PageButton
        key={index}
        $isActive={currentPage === page}
        disabled={page === "..."}
        onClick={() => handlePageChange(page)}
        aria-label={`Página ${page}`}
      >
        {page}
      </PageButton>
    ));
  };

  return (
    <PaginationContainer>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        Anterior
      </PageButton>
      {renderPageNumbers()}
      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        aria-label="Próxima página"
      >
        Próxima
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
