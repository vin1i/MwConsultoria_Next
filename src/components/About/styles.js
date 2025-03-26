import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  gap: 50px;

  /* Large desktop screens */
  @media (min-width: 1441px) {
    gap: 50px;
    padding: 20px 40px;
  }

  /* Medium desktop screens */
  @media (min-width: 1281px) and (max-width: 1440px) {
    gap: 45px;
    padding: 20px 30px;
  }

  /* Small desktop and notebook screens */
  @media (min-width: 1025px) and (max-width: 1280px) {
    gap: 40px;
    padding: 15px;
  }

  /* Tablets and small notebooks */
  @media (min-width: 769px) and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  /* Mobile devices */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    gap: 20px;
  }
`

export const Image = styled.img`
  border-radius: 8px;
  width: 100%;
  max-width: 650px;
  height: auto;
  object-fit: cover;

  /* Large desktop screens */
  @media (min-width: 1441px) {
    max-width: 40%; /* Changed to percentage */
  }

  /* Medium desktop screens */
  @media (min-width: 1281px) and (max-width: 1440px) {
    max-width: 42%; /* Changed to percentage */
  }

  /* Small desktop and notebook screens */
  @media (min-width: 1025px) and (max-width: 1280px) {
    max-width: 45%;
  }

  /* Tablets and small notebooks */
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 80%;
  }

  /* Mobile devices */
  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`

export const Text = styled.div`
  width: 45%;
  padding: 30px 0 0 30px;

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

  /* Large desktop screens */
  @media (min-width: 1441px) {
    width: 50%; /* Increased from 45% */
    padding: 20px 0 0 30px; /* Reduced top padding */

    h1 {
      font-size: 2.2rem; /* Reduced from 2.8rem */
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.8rem; /* Reduced from 2.2rem */
      margin-bottom: 20px;
    }

    p {
      font-size: 1.4rem; /* Reduced from 1.7rem */
      line-height: 1.6;
    }
  }

  /* Medium desktop screens */
  @media (min-width: 1281px) and (max-width: 1440px) {
    width: 48%; /* Increased from 45% */
    padding: 20px 0 0 25px;

    h1 {
      font-size: 2.1rem; /* Reduced from 2.4rem */
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.7rem; /* Reduced from 1.9rem */
      margin-bottom: 20px;
    }

    p {
      font-size: 1.3rem; /* Reduced from 1.5rem */
      line-height: 1.5;
    }
  }

  /* Small desktop and notebook screens */
  @media (min-width: 1025px) and (max-width: 1280px) {
    width: 45%;
    padding: 20px 0 0 20px;

    h1 {
      font-size: 2.2rem;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 1.8rem;
      margin-bottom: 20px;
    }

    p {
      font-size: 1.4rem;
      line-height: 1.5;
    }
  }

  /* Tablets and small notebooks */
  @media (min-width: 769px) and (max-width: 1024px) {
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

  /* Mobile devices */
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
`

export const Arrow = styled.img`
  width: 150px; /* Reduced from 180px */
  margin-left: 10px; /* Reduced from 20px */
  align-self: flex-start;

  /* Large desktop screens */
  @media (min-width: 1441px) {
    width: 160px; /* Reduced from 220px */
    margin-left: 10px;
  }

  /* Medium desktop screens */
  @media (min-width: 1281px) and (max-width: 1440px) {
    width: 150px; /* Reduced from 180px */
    margin-left: 10px;
  }

  /* Small desktop and notebook screens */
  @media (min-width: 1025px) and (max-width: 1280px) {
    width: 140px;
    margin-left: 10px;
  }

  /* Tablets and small notebooks */
  @media (min-width: 769px) and (max-width: 1024px) {
    display: none;
  }
`

