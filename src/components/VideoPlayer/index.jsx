import styled from "styled-components";
import Iframe from "../Iframe";
import PropTypes from "prop-types";

const VideoContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 4px;
  border: 4px solid var(--color-blue-light);
  box-shadow: 0px 0px 17px 8px var(--color-blue-light) inset;
`;

const VideoPlayer = ({ videoUrl }) => {
  return (
    <VideoContainer>
      <Iframe src={videoUrl} title="YouTube video player" />
    </VideoContainer>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default VideoPlayer;
