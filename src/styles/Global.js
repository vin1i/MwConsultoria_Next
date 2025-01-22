import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @font-face {
    font-family: 'Lato';
    src: url('/assets/fonts/Lato-Bold.ttf') format('truetype');
    font-weight: bold;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/assets/fonts/Lato-ExtraLight.ttf') format('truetype');
    font-weight: 200;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/assets/fonts/Lato-Light.ttf') format('truetype');
    font-weight: 300;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/assets/fonts/Lato-Regular.ttf') format('truetype');
    font-weight: normal;
  }

  @font-face {
    font-family: 'Myriad Pro';
    src: url('/assets/fonts/Myriad Pro Condensed.ttf') format('truetype');
    font-weight: normal;
    font-stretch: condensed;
  }

  @font-face {
    font-family: 'Myriad Pro';
    src: url('/assets/fonts/Myriad Pro Light Condensed.otf') format('truetype');
    font-weight: 300;
    font-stretch: condensed;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --white: #FFFFFF;
    --black: #333333;
    --grey: #E6E6E6;
    --red: #9C192B;
    --dark-red: #6B0D1A;
    --light-green: #32D951;

    --font-size-large: 1.2rem;
    --font-size-medium: 1rem;
    --font-size-small: 0.9rem;
  }

  body {
    background-color: var(--white);
    color: var(--black);
    font-size: var(--font-size-large);
    font-weight: 400;
    font-family: 'Lato', 'Myriad Pro Condensed', sans-serif;
    overflow-x: hidden;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--red);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--dark-red);
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }

  @media (max-width: 768px) {
    ::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    body {
      font-size: var(--font-size-medium);
      padding: 0 10px;
    }

    h1, h2, h3 {
      font-size: 1.2em;
    }

    p {
      font-size: var(--font-size-medium);
    }
  }

  @media (max-width: 480px) {
    ::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    body {
      font-size: var(--font-size-small);
      padding: 0 5px;
    }

    h1, h2, h3 {
      font-size: 1em;
    }

    img {
      max-width: 100%;
      height: auto;
    }

    button {
      font-size: var(--font-size-small);
      padding: 10px 15px;
    }
  }
`;
