import styled from "styled-components";

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  aspect-ratio: 16/9;
  overflow: hidden;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
