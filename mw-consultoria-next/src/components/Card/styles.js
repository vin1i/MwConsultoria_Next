import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0 auto;
  }
`;

// Image Container
export const ImageContainer = styled.div`
  position: relative;
  flex: 1;
  padding-top: 56.25%; /* Aspect ratio de 16:9 */
  background-color: #ddd;
  overflow: hidden;
  transition: transform 0.3s ease;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding-top: 75%; /* Proporção 4:3 para telas menores */
  }
`;

// Info Container
export const InfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Title
export const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
  border-bottom: 2px solid #e50914;
  padding-bottom: 6px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Address
export const Address = styled.p`
  font-size: 1rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #e50914;
  }
`;

// Features
export const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.9rem;
  color: #666;

  span {
    display: flex;
    align-items: center;
    gap: 6px;

    svg {
      color: #e50914;
    }
  }
`;

// Description
export const Description = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
  height: 3em; /* Limita a altura da descrição */
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Price Container
export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Main Price
export const MainPrice = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #e50914;
`;

// Secondary Price
export const SecondaryPrice = styled.div`
  font-size: 0.9rem;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    margin: 0;
  }

  strong {
    font-weight: bold;
  }
`;

// Status Badge
export const StatusBadge = styled.span`
  padding: 6px 12px;
  background-color: ${({ $status }) =>
    $status === "Disponível" ? "rgba(76, 175, 80, 0.2)" : $status === "Indisponível" ? "rgba(244, 67, 54, 0.2)" : "rgba(158, 158, 158, 0.2)"};
  color: ${({ $status }) =>
    $status === "Disponível" ? "green" : $status === "Indisponível" ? "red" : "gray"};
  font-weight: bold;
  font-size: 0.9rem;
  border-radius: 20px;
  text-transform: uppercase;
  align-self: flex-start;
`;

// Button
export const Button = styled.button`
  background-color: #e50914;
  color: #fff;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #d40813;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
  }
`;

