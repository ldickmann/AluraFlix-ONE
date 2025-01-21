/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const ButtonBig = styled.button`
  width: 296.822px;
  height: 92px;
  background-color: #6bd1ff;
  border-radius: 15px;
  border: none;

  &.card-button {
    color: #f5f5f5;
    text-align: center;
    font-family: "Roboto";
    font-size: 48px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

const ButtonMedium = styled.button`
  width: 150px;
  height: 50px;
  background-color: #6bd1ff;
  border-radius: 10px;
  border: none;

  &.card-button {
    color: #f5f5f5;
    text-align: center;
    font-family: "Roboto";
    font-size: 24px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;

const ButtonSmall = styled.button`
  width: 150px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.card-button {
    background: none;
    border: none;
    color: var(--color-white);
    text-align: center;
    font-family: "Roboto";
    font-size: 16px;
    font-weight: 800;
    text-transform: uppercase;
    gap: 25px;
  }

  svg {
    width: 25px;
    height: 28px;
  }
`;

const commonStyles = css`
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
    line-height: 24px;
    text-transform: uppercase;
  }
`;

const ButtonBigStyled = styled(ButtonBig)`
  ${commonStyles}
`;

const ButtonMediumStyled = styled(ButtonMedium)`
  ${commonStyles}
`;

const ButtonSmallStyled = styled(ButtonSmall)`
  ${commonStyles}
`;

const Button = ({
  children,
  type,
  handleClick,
  className,
  size,
  icon: Icon,
}) => {
  let ButtonComponent;
  switch (size) {
    case "big":
      ButtonComponent = ButtonBigStyled;
      break;
    case "small":
      ButtonComponent = ButtonSmallStyled;
      break;
    default:
      ButtonComponent = ButtonMediumStyled;
  }

  return (
    <ButtonComponent
      className={className}
      type={type}
      onClick={handleClick}
      size={size}
    >
      {Icon && <Icon />}
      {children}
    </ButtonComponent>
  );
};

export default Button;
