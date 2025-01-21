import styled from "styled-components";
import Button from "../Button";
import VideoPlayer from "../VideoPlayer";
import PropTypes from "prop-types";

const CardContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h2`
  margin: 10px 0;
  font-family: "Roboto";
  font-size: 46px;
  font-weight: 400;
  color: var(--color-gray);
`;

export const Description = styled.p`
  color: var(--color-gray);
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  max-width: 50%;
`;

const Card = ({ title, description, buttonText }) => {
  return (
    <CardContainer>
      <CardContent>
        <Button size="big" className="card-button">
          {buttonText}
        </Button>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CardContent>
      <VideoPlayer />
    </CardContainer>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Card;
