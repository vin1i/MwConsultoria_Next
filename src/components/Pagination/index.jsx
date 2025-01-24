import React from "react";
import { PageButton, PaginationContainer } from "./styles";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) =>
    page >= 1 && page <= totalPages && page !== currentPage
      ? onPageChange(page)
      : null;

  const getVisiblePages = () => {
    const pages = [];

    // Sempre mostra a página atual e a próxima
    if (currentPage < totalPages) {
      pages.push(currentPage, currentPage + 1);
    }

    // Garante que o ponto "..." aparece entre as páginas visíveis e a última
    if (currentPage + 1 < totalPages - 1) {
      pages.push("...");
    }

    // Adiciona a última página se não for a atual ou a próxima
    if (currentPage + 1 < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <PaginationContainer>
      {/* Botão anterior */}
      <PageButton
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        Anterior
      </PageButton>

      {/* Botões das páginas */}
      {visiblePages.map((page, index) => (
        typeof page === "number" ? (
          <PageButton
            key={page}
            $isActive={currentPage === page}
            onClick={() => handlePageChange(page)}
            aria-label={`Página ${page}`}
          >
            {page}
          </PageButton>
        ) : (
          <span key={`ellipsis-${index}`} style={{ margin: "0 8px" }}>
            ...
          </span>
        )
      ))}

      {/* Botão próximo */}
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
