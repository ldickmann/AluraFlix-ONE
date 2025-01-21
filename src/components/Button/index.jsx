import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const ButtonBase = styled.button`
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  font-family: "Roboto";
  font-weight: 800;

  &.card-button {
    border: none;
    color: var(--color-white);
    gap: 25px;
  }

  svg {
    width: 25px;
    height: 28px;
  }

  ${(props) =>
    props.size === "big" &&
    css`
      width: 296.822px;
      height: 92px;
      background-color: var(--color-blue-light);
      border-radius: 15px;
      font-size: 48px;
    `}

  ${(props) =>
    props.size === "medium" &&
    css`
      width: 150px;
      height: 50px;
      background-color: var(--color-blue-light);
      border-radius: 10px;
      font-size: 24px;
    `}

  ${(props) =>
    props.size === "small" &&
    css`
      background: none;
      width: 150px;
      height: 28px;
      font-size: 16px;
      display: flex;
    `}

  &.home-button {
    color: var(--color-blue);
    border-radius: 10px;
    border: 2px solid var(--color-blue);
    background: rgba(0, 0, 0, 0.9);
    box-shadow: 0px 0px 12px 4px #2271d1 inset;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-weight: 900;
    line-height: 24px;
  }

  &.new-movie {
    border-radius: 10px;
    border: 2px solid #f5f5f5;
    background: none;
    color: #fff;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-weight: 900;
    line-height: 24px;
  }
`;

const Button = ({
  children,
  type = "button",
  onClick = null,
  className = "",
  size = "medium",
  icon: Icon = null,
}) => {
  return (
    <ButtonBase className={className} type={type} onClick={onClick} size={size}>
      {Icon && <Icon />}
      {children}
    </ButtonBase>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(["big", "medium", "small"]),
  icon: PropTypes.elementType,
};

export default Button;
