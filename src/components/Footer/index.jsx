import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import Button from "../Button";
import { FaHome, FaPlusCircle } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useLocation, Link } from "react-router-dom";

const Footer = styled.footer`
  border-top: 4px solid var(--color-blue);
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0px 5px 29px 0px rgba(34, 113, 209, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 125px;
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterComponent = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isNewMoviePage = location.pathname === "/NovoVideo";

  return (
    <Footer>
      {!isMobile && <img src={logo} alt="AluraFlix logo" />}
      {isMobile && (
        <FooterButtons>
          <Link to="/">
            <Button
              className={`footer-home-button ${isHomePage ? "active" : ""}`}
            >
              {isHomePage ? "Home" : <FaHome />}
            </Button>
          </Link>
          <Link to="/NovoVideo">
            <Button
              className={`footer-new-movie ${isNewMoviePage ? "active" : ""}`}
            >
              {isNewMoviePage ? "Novo Video" : <FaPlusCircle />}
            </Button>
          </Link>
        </FooterButtons>
      )}
    </Footer>
  );
};

export default FooterComponent;
