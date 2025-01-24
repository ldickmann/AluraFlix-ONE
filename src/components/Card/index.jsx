import styled from "styled-components";
import Button from "../Button";
import VideoPlayer from "../VideoPlayer";
import PropTypes from "prop-types";

const CardContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  gap: 10rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardContent = styled.div`
  max-width: 40%;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 0;
`;

export const Title = styled.h2`
  font-family: "Roboto";
  font-size: 46px;
  font-weight: 400;
  color: var(--color-gray);
  flex-shrink: 1;
  flex-basis: auto;
`;

export const Description = styled.p`
  color: var(--color-gray);
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 300;
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
      <VideoPlayer videoUrl="https://www.youtube.com/embed/c8mVlakBESE?si=O73Y-oiJIBFvMJr3" />
    </CardContainer>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Card;
