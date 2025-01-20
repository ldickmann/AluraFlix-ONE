import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import Button from "../Button";

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 125px;
  border-bottom: 4px solid var(--Blue, #2271d1);
  background: var(--Dark-Grey, #262626);
  box-shadow: 0px 5px 29px 0px rgba(34, 113, 209, 0.7);
  padding: 0 30px 0 30px;
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
  return (
    <HeaderStyle>
      <Logo src={logo} alt="AluraFlix logo" />
      <ButtonsHeader>
        <Button type="button" className="home-button">
          Home
        </Button>
        <Button type="button" className="new-movie">
          Novo Video
        </Button>
      </ButtonsHeader>
    </HeaderStyle>
  );
};

export default Header;
