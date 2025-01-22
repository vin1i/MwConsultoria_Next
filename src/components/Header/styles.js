import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 100px; /* Espaçamento maior para desktop */
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid var(--red);
  background-color: var(--white);

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Logo = styled.div`
  img {
    max-width: 190px;
    width: 100%;
  }
`;

export const Menu = styled.div`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;

    li {
      margin-right: 40px;
      cursor: pointer;
      padding: 10px;

      &:hover {
        color: var(--red);
      }
    }

    span {
      font-size: 1.4rem;
      font-family: "Myriad Pro", sans-serif;
      font-weight: 500;
      font-stretch: condensed;
    }

    @media (max-width: 768px) {
      display: none; /* Esconde o menu na parte superior no mobile */
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-right: 15px;
    color: var(--black);
    transition: color 0.3s ease;

    &:hover {
      color: var(--red);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const BottomNav = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--white);
    border-top: 1px solid var(--grey);
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    z-index: 1000;
  }
`;

export const BottomNavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  color: var(--black);
  cursor: pointer;

  svg {
    margin-bottom: 5px;
    color: var(--black);
    transition: color 0.3s ease;
  }

  &:hover {
    svg {
      color: var(--red);
    }

    span {
      color: var(--red);
    }
  }

  span {
    font-size: 0.7rem;
    font-family: "Myriad Pro", sans-serif;
  }
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: var(--red);
  }
`;

export const NavIcon = styled.div`
  font-size: 1.2rem;
`;

export const NavText = styled.div`
  font-size: 0.9rem;
  text-transform: lowercase;
`;
