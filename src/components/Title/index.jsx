/* eslint-disable react/prop-types */
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-gray);
  font-family: Roboto;
  font-size: 60px;
  font-weight: 900;
  text-transform: uppercase;
`;

const Subtitle = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-gray);
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
`;

const TitleComponent = ({ children }) => {
  return (
    <Container>
      <Title>{children}</Title>
      <Subtitle>
        Complete o formulário para criar um novo card de vídeo.
      </Subtitle>
    </Container>
  );
};

export default TitleComponent;
