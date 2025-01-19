import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
  
      if (urlObj.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
      }
  
      if (urlObj.hostname.includes("youtube.com") && urlObj.searchParams.has("v")) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
      }
  
      throw new Error("URL de vídeo inválida.");
    } catch (error) {
      console.error("Erro ao processar a URL do YouTube:", error.message);
      return null;
    }
  };

const VideoFrame = ({ videoUrl }) => {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  if (!embedUrl) {
    return <p>URL de vídeo inválida.</p>;
  }

  return (
    <iframe
      width="100%"
      height="200"
      src={embedUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube Video"
    ></iframe>
  );
};

VideoFrame.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default VideoFrame;

const Iframe = styled.iframe`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-top: 10px;
`;
