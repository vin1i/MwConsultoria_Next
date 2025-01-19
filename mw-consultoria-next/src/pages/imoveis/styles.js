import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;
