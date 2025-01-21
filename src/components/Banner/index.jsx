import styled from "styled-components";

const BannerStyles = styled.div`
  background-image: url(${(props) => `/images/banner-${props.$image}.png`});
  opacity: 0.8;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 4px solid var(--color-blue-light);
  width: 100%;
  height: 832px;
`;

// eslint-disable-next-line react/prop-types
const Banner = ({ image }) => {
  return <BannerStyles $image={image}></BannerStyles>;
};

export default Banner;
