import styled from "styled-components";
import Button from "../Button";
import VideoPlayer from "../VideoPlayer";

const CardContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h2`
  margin: 10px 0 10px 0;
  font-family: "Roboto";
  font-size: 46px;
  font-weight: 400;
  color: var(--color-gray);
`;

const Paragraph = styled.p`
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

const Card = () => {
  return (
    <CardContainer>
      <CardContent>
        <Button className="card-button" size="big">
          Front End
        </Button>
        <Title>SEO com React</Title>
        <Paragraph>
          Eu to aqui pra nesse vídeo dizer que a gente vai aprender a começar
          uma app inspirada no desenho Pokémon com Nextjs e React, ver algumas
          dicas sobre performance e de quebra conhecer uma plataforma
          sensacional pra fazer deploy que é a Vercel. Tudo em 22 minutos nesse
          vídeo feito com todo o carinho do mundo construindo um "Pokedex"!
        </Paragraph>
      </CardContent>
      <VideoPlayer />
    </CardContainer>
  );
};

export default Card;
