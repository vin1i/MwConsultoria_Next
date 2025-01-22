import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 20px 40px;

  .imoveis-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;

    .imoveis-list {
      grid-template-columns: 1fr;
    }
  }
`;
