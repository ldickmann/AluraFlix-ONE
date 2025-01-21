import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import Button from "../Button";
import { FaHome } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });

  return (
    <Footer>
      {!isMobile && <img src={logo} alt="AluraFlix logo" />}
      {isMobile && (
        <Button
          type="button"
          className="footer-home-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaHome size={20} />
          Home
        </Button>
      )}
    </Footer>
  );
};

export default FooterComponent;
