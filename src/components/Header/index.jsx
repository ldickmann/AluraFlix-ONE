import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import Button from "../Button";
import { useLocation, Link } from "react-router-dom";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 125px;
  border-bottom: 4px solid var(--color-blue);
  background: var(--color-dark);
  box-shadow: 0px 5px 29px 0px rgba(34, 113, 209, 0.7);
  padding: 0 30px 0 30px;

  @media (max-width: 430px) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 40px;
  display: flex;
  flex-shrink: 0;
`;

const ButtonsHeader = styled.div`
  display: flex;
  gap: 25px;
`;

const Header = () => {
  const location = useLocation();

  return (
    <HeaderStyle>
      <Logo src={logo} alt="AluraFlix logo" />
      <ButtonsHeader>
        <Link to="/">
          <Button
            type="button"
            className={location.pathname === "/" ? "home-button" : "new-movie"}
          >
            Home
          </Button>
        </Link>
        <Link to="/NovoVideo">
          <Button
            type="button"
            className={
              location.pathname === "/NovoVideo" ? "home-button" : "new-movie"
            }
          >
            Novo Video
          </Button>
        </Link>
      </ButtonsHeader>
    </HeaderStyle>
  );
};

export default Header;
