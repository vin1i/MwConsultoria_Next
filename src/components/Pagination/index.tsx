import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) =>
    page >= 1 && page <= totalPages && page !== currentPage ? onPageChange(page) : null;

  const getVisiblePages = () => {
    const pages = [];

    // Adiciona a página anterior
    if (currentPage > 1) {
      pages.push(currentPage - 1);
    }

    // Sempre mostra a página atual
    pages.push(currentPage);

    // Adiciona a próxima página se não for a última
    if (currentPage < totalPages) {
      pages.push(currentPage + 1);
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
    <nav className="flex items-center justify-center space-x-2 my-8" aria-label="Paginação">
      {/* Botão anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-[#9C192B] border border-gray-300"
        }`}
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
      </button>

      {/* Botões das páginas */}
      <div className="flex items-center space-x-2">
        {visiblePages.map((page, index) => (
          typeof page === "number" ? (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-[#9C192B] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:text-[#9C192B] border border-gray-300"
              }`}
              aria-label={`Página ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-gray-500"
            >
              ...
            </span>
          )
        ))}
      </div>

      {/* Botão próximo */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-[#9C192B] border border-gray-300"
        }`}
        aria-label="Próxima página"
      >
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pagination;
