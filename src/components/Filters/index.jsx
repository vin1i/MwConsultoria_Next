import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  FiltersContainer,
  FieldContainer,
  Label,
  PriceInput,
  StyledSelect,
  SliderWrapper,
} from "./styles";
import filtersOptions from "@/data/FiltersOptions";
import { FilterX } from "lucide-react";

const Filters = ({ filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 200000000]);
  const [tempPriceRange, setTempPriceRange] = useState([0, 200000000]);
  
  
  useEffect(() => {
    setPriceRange([0, 200000000]);
    setTempPriceRange([0, 200000000]);
    onFilterChange({
      ...filters,
      precoMinimo: 0,
      precoMaximo: 200000000,
      ordenacaoVenda: "",
      ordenacaoLocacao: "",
      ordenacaoOutros: "",
    });
  }, []);

  const formatToReais = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    });
  };

    const handleClearFilters = () => {
    setPriceRange([0, 200000000]);
    setTempPriceRange([0, 200000000]);
    const resetFilters = {
      ...filters,
      precoMinimo: 0,
      precoMaximo: 200000000,  
      ordenacaoVenda: "",
      ordenacaoLocacao: "",
      ordenacaoOutros: "",
    };
    filtersOptions.forEach(({key}) => { 
      resetFilters[key] = "";
    })
    onFilterChange(resetFilters);
  };

const handleRangeChange = (range) => {
  setPriceRange(range);
  setTempPriceRange(range); 

  onFilterChange({
    ...filters,
    precoMinimo: range[0],
    precoMaximo: range[1],
  });
};


const handleTempInputChange = (index, value) => {
  const updatedTempRange = [...tempPriceRange];
  updatedTempRange[index] = value === "" ? "" : Number(value);
  setTempPriceRange(updatedTempRange); 
};

 const applyInputChange = (index) => {
  const updatedRange = [...tempPriceRange];

  // Garante que os valores estejam dentro do limite
  updatedRange[0] = Math.max(0, Math.min(200000000, updatedRange[0]));
  updatedRange[1] = Math.max(0, Math.min(200000000, updatedRange[1]));

  // Evita que o mínimo seja maior que o máximo
  if (updatedRange[0] > updatedRange[1]) {
    if (index === 0) updatedRange[1] = updatedRange[0];
    if (index === 1) updatedRange[0] = updatedRange[1];
  }

  setPriceRange(updatedRange); // Atualiza o Slider
  setTempPriceRange(updatedRange); // Atualiza os inputs

  onFilterChange({
    ...filters,
    precoMinimo: updatedRange[0],
    precoMaximo: updatedRange[1],
  });
};
const handleSortChange = (e, type) => {
  const sortValue = e.target.value;
  const key = `ordenacao${type}`;
  onFilterChange({
    ...filters,
    [key]: sortValue === "" ? "" : sortValue,
  });
};

  return (
    <FiltersContainer>
      {/* Filtro de Preço */}
      <FieldContainer>
        <Label>Preço (R$)</Label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    <PriceInput
      type="text"
      value={formatToReais(tempPriceRange[0])}
      onChange={(e) =>
        handleTempInputChange(0, e.target.value.replace(/[^\d]/g, ""))
      }
      onBlur={() => applyInputChange(0)}
      onKeyDown={(e) => e.key === "Enter" && applyInputChange(0)}
    />
    <span style={{ fontWeight: "bold", color: "#333" }}>até</span>
    <PriceInput
      type="text"
      value={formatToReais(tempPriceRange[1])}
      onChange={(e) =>
        handleTempInputChange(1, e.target.value.replace(/[^\d]/g, ""))
      }
      onBlur={() => applyInputChange(1)}
      onKeyDown={(e) => e.key === "Enter" && applyInputChange(1)}
    />
          
           <button
          className="absolute top-2 right-2 bg-transparent border-none cursor-pointer flex items-center justify-center p-2"
          onClick={handleClearFilters}
          title="Limpar filtro"
        >
          <FilterX size={20} className="text-gray-500 hover:text-primary transition" />
        </button>
        
        </div>
        <SliderWrapper>
    <Slider
      range
      min={0}
      max={200000000}
      step={10000}
      value={priceRange}
      onChange={handleRangeChange}
      trackStyle={{ backgroundColor: "var(--red)", height: 8 }}
      handleStyle={{
        borderColor: "var(--red)",
        backgroundColor: "#fff",
        height: 20,
        width: 20,
        marginTop: -6,
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
      }}
      railStyle={{ backgroundColor: "#ddd", height: 8 }}
    />
  </SliderWrapper>
      </FieldContainer>


<FieldContainer>
  <Label>Ordenar por Venda</Label>
  <StyledSelect
    value={filters.ordenacaoVenda || ""}
    onChange={(e) => handleSortChange(e, "Venda")}
  >
    <option value="">Selecione</option>
    <option value="asc">Menor para Maior</option>
    <option value="desc">Maior para Menor</option>
  </StyledSelect>
</FieldContainer>


      {/* Filtro de Ordenação por Locação */}
      <FieldContainer>
        <Label>Ordenar por Locação</Label>
        <StyledSelect
          value={filters.ordenacaoLocacao || ""}
          onChange={(e) => handleSortChange(e, "Locacao")}
        >
          <option value="">Selecione</option>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </StyledSelect>
      </FieldContainer>

      {/* Filtro de Ordenação por Condomínio */}
      <FieldContainer>
        <Label>Ordenar por Condomínio</Label>
        <StyledSelect
          value={filters.ordenacaoOutros || ""}
          onChange={(e) => handleSortChange(e, "Outros")}
        >
          <option value="">Selecione</option>
          <option value="asc">Menor para Maior</option>
          <option value="desc">Maior para Menor</option>
        </StyledSelect>
      </FieldContainer>

      {/* Outros filtros */}
      {filtersOptions.map(({ id, label, key, options }) => (
        <FieldContainer key={id}>
          <Label htmlFor={id}>{label}</Label>
          <StyledSelect
            id={id}
            value={filters[key] || ""}
            onChange={(e) => onFilterChange({ ...filters, [key]: e.target.value })}
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </StyledSelect>
        </FieldContainer>
      ))}
    </FiltersContainer>
  );
};

export default Filters;
