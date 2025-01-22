const filtersOptions = [
    {
      id: "tipo",
      label: "Tipo de Negócio",
      key: "tipo",
      options: [
        { value: "", label: "Todos" },
        { value: "venda", label: "Venda" },
        { value: "locacao", label: "Locação" },
        { value: "vendaLocacao", label: "Venda e Locação" },
      ],
    },
    {
      id: "quartos",
      label: "Quartos",
      key: "quartos",
      options: [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5+", label: "5+" },
      ],
    },
    {
      id: "banheiros",
      label: "Banheiros",
      key: "banheiros",
      options: [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5+", label: "5+" },
      ],
    },
    {
      id: "vagas",
      label: "Vagas",
      key: "vagas",
      options: [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5+", label: "5+" },
      ],
    },
    {
      id: "precoMinimo",
      label: "Preço Mínimo",
      key: "precoMinimo",
      options: [
        { value: "", label: "Qualquer" },
        { value: "100000", label: "R$100.000" },
        { value: "200000", label: "R$200.000" },
        { value: "500000", label: "R$500.000" },
      ],
    },
    {
      id: "precoMaximo",
      label: "Preço Máximo",
      key: "precoMaximo",
      options: [
        { value: "", label: "Qualquer" },
        { value: "500000", label: "R$500.000" },
        { value: "1000000", label: "R$1.000.000" },
        { value: "2000000", label: "R$2.000.000" },
      ],
    },
  ];
  
  export default filtersOptions;
  