import styled from "styled-components";

const BannerStyles = styled.div`
  background-image: url(${(props) => `/images/banner-${props.$image}.png`});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 832px;
`;

// eslint-disable-next-line react/prop-types
const Banner = ({ image }) => {
  return <BannerStyles $image={image}></BannerStyles>;
};

export default Banner;
