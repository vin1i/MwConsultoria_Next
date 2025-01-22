import React from "react";
import ReactPlayer from "react-player";
import { VideoContainer } from "./styles";

const VideoPlayer = ({ videoUrl }) => {
  // Detecta a plataforma e ajusta a URL
  let videoSource = videoUrl;

  if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
    const match = videoUrl.match(/[?&]v=([^&]+)/) || videoUrl.match(/youtu\.be\/([^?]+)/);
    if (match && match[1]) {
      videoSource = `https://www.youtube.com/watch?v=${match[1]}`;
    }
  }

  if (videoUrl.includes("vimeo.com")) {
    const videoId = videoUrl.split("/").pop();
    videoSource = `https://vimeo.com/${videoId}`;
  }

  return (
    <VideoContainer>
      <ReactPlayer
        url={videoSource}
        controls
        width="100%"
        height="100%"
        config={{
          youtube: { playerVars: { showinfo: 0 } },
          vimeo: { playerOptions: { title: 0, byline: 0 } },
        }}
      />
    </VideoContainer>
  );
};

export default VideoPlayer;
