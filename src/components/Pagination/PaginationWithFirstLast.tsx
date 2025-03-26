"use client"

import type React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const PaginationWithFirstLast: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) =>
    page >= 1 && page <= totalPages && page !== currentPage ? onPageChange(page) : null

  // Função para gerar array de páginas visíveis
  const getVisiblePages = () => {
    const delta = 1 // Número de páginas para mostrar antes e depois da atual
    const pages = []

    // Sempre adiciona a primeira página
    pages.push(1)

    // Adiciona elipses se necessário
    if (currentPage - delta > 2) {
      pages.push("...")
    }

    // Adiciona páginas ao redor da página atual
    const rangeStart = Math.max(2, currentPage - delta)
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta)

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Adiciona elipses se necessário
    if (currentPage + delta < totalPages - 1) {
      pages.push("...")
    }

    // Adiciona a última página se não for a primeira
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <nav className="flex items-center justify-center space-x-1 my-8" aria-label="Paginação">
      {/* Botão primeira página */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md transition-colors
          ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#9C192B]"
          }`}
        aria-label="Primeira página"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>

      {/* Botão anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md transition-colors
          ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#9C192B]"
          }`}
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Botões das páginas */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors
                ${
                  currentPage === page
                    ? "bg-[#9C192B] text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#9C192B]"
                }`}
              aria-label={`Página ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-500">
              ...
            </span>
          ),
        )}
      </div>

      {/* Botão próximo */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md transition-colors
          ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#9C192B]"
          }`}
        aria-label="Próxima página"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Botão última página */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md transition-colors
          ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100 hover:text-[#9C192B]"
          }`}
        aria-label="Última página"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

export default PaginationWithFirstLast

