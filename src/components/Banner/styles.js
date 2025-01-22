import styled from "styled-components";

export const Container = styled.div`
  padding: 25px 150px;
  position: relative;
  background-image: url("/images/BannerHome.png");
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 20px;
    height: 70vh;
  }

  @media (max-width: 768px) {
    padding: 15px;
    height: 60vh;
  }

  @media (max-width: 480px) {
    padding: 10px;
    height: 50vh;
  }
`;

export const Text = styled.div`
  font-size: 30px;
  background-color: rgba(156, 25, 43, 0.75);
  color: var(--white);
  padding: 30px 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  width: 70%;
  max-width: 55%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;

  @media (max-width: 1024px) {
    font-size: 24px;
    padding: 25px 15px;
    max-width: 60%;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 20px 10px;
    max-width: 70%;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 15px 8px;
    max-width: 90%;
    align-items: flex-end;
    text-align: right;
  }
`;

export const Divider = styled.div`
  width: 80%;
  height: 2px;
  background-color: var(--white);
  margin: 5px 0;

  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 480px) {
    width: 60%;
  }
`;
