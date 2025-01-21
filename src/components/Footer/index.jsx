import styled from "styled-components";
import logo from "../../assets/images/logo.png";

const Footer = styled.footer`
  border-top: 4px solid var(--color-blue);
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0px 5px 29px 0px rgba(34, 113, 209, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 125px;
`;

const FooterComponent = () => {
  return (
    <Footer>
      <img src={logo} alt="AluraFlix logo" />
    </Footer>
  );
};

export default FooterComponent;
