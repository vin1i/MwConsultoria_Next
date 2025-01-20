
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
        { value: "Qualquer", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5+", label: "5+" }, // Adiciona opção para 5 ou mais
      ],
    },
    {
      id: "suites",
      label: "Suítes",
      key: "suites",
      options: [
        { value: "", label: "Qualquer" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5+", label: "5+" }, // Para 5 ou mais suítes
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
        { value: "5+", label: "5+" }, // Adiciona opção para 5 ou mais
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
        { value: "5+", label: "5+" }, // Adiciona opção para 5 ou mais
      ],
    },
  ];
export default filtersOptions;