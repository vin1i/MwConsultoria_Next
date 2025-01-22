  import styled from "styled-components";

  export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 1rem; /* Aumenta padding lateral */
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 1000px; /* Aumenta a largura máxima */
    width: 100%; /* Garante que o container se expanda horizontalmente */
    min-height: 400px;

    @media (max-width: 768px) {
      max-width: 100%; /* Responsivo em telas menores */
      padding: 1.5rem 1rem;
      gap: 0.8rem;
    }
  `;

  export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: 768px) {
      gap: 0.3rem;
    }
  `;

  export const Label = styled.label`
    font-weight: bold;
    color: #333;
    font-size: 1rem;
  `;

  export const PriceInput = styled.input`
    flex: 1;
    min-width: 0;
    max-width: 120px;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;

    &:focus {
      outline: none;
      border-color: var(--red);
      box-shadow: 0 0 0 2px rgba(255, 82, 82, 0.3);
    }
  `;

  export const StyledSelect = styled.select`
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #333;

    &:focus {
      outline: none;
      border-color: var(--red);
      box-shadow: 0 0 0 2px rgba(255, 82, 82, 0.3);
    }

    &:hover {
      border-color: var(--red);
    }
  `;

  export const SliderWrapper = styled.div`
    width: 100%;
    margin-top: 1rem;
    padding: 0 10px;
    box-sizing: border-box;
    position: relative;
  `;
