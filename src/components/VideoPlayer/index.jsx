import styled from "styled-components";

const VideoContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const VideoPlayer = () => {
  return (
    <VideoContainer>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/c8mVlakBESE?si=O73Y-oiJIBFvMJr3"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </VideoContainer>
  );
};

export default VideoPlayer;
