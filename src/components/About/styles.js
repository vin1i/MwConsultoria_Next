import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  gap: 50px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 20px;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 650px;
  height: auto;
  object-fit: cover;

  @media (max-width: 1024px) {
    max-width: 80%;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const Text = styled.div`
  width: 570px;
  padding: 30px 0 0 50px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--red);
  }

  h3 {
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 25px;
    font-weight: 500;
    color: var(--black);
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 20px;
    line-height: 1.5;
    color: var(--black);
  }

  @media (max-width: 1024px) {
    padding: 0 20px;
    text-align: center;
    width: 90%;

    h1 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 768px) {
    padding: 0;
    width: 100%;

    h1 {
      font-size: 1.8rem;
    }

    h3 {
      font-size: 1.6rem;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.4;
    }
  }
`;

export const Arrow = styled.img`
  width: 220px;
  margin-left: 20px;
  align-self: flex-start;

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 768px) {
    display: block;
    width: 50px;
    margin: 20px auto;
  }
`;
