import styled from "styled-components";
import PropTypes from "prop-types";
import { Title, Description } from "../Card";

const BannerStyles = styled.div`
  background-image: url(${(props) => `/images/banner-${props.$image}.png`});
  opacity: 0.8;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 4px solid var(--color-blue-light);
  width: 100%;
  height: 832px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Banner = ({ image, title, description }) => {
  return (
    <BannerStyles $image={image}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </BannerStyles>
  );
};

Banner.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Banner;
