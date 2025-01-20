import styled from "styled-components";

const ButtonStyled = styled.button`
  width: 180.125px;
  height: 54px;

  &.home-button {
    color: var(--color-blue);
    border-radius: 10px;
    border: 2px solid var(--color-blue);
    background: rgba(0, 0, 0, 0.9);
    box-shadow: 0px 0px 12px 4px #2271d1 inset;
    text-align: center;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 24px;
    text-transform: uppercase;
  }

  &.new-movie {
    border-radius: 10px;
    border: 2px solid #f5f5f5;
    background: none;
    color: #fff;
    text-align: center;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 24px; /* 120% */
    text-transform: uppercase;
  }
`;

// eslint-disable-next-line react/prop-types
const Button = ({ children, type, handleClick, className }) => {
  return (
    <ButtonStyled className={className} type={type} onClick={handleClick}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
