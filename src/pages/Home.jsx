import Banner from "../components/Banner";
import Card from "../components/Card";
import Cards from "../components/Card/Cards";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CardWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 130px 50px 0 50px;
`;

const CardsSection = styled.div`
  margin-bottom: 100px;
`;

const Home = () => {
  return (
    <Container>
      <BannerWrapper>
        <Banner image="home" />
        <CardWrapper>
          <Card
            title="SEO com React"
            description="Eu to aqui pra nesse vídeo dizer que a gente vai aprender a começar uma app inspirada no desenho Pokémon com Nextjs e React, ver algumas dicas sobre performance e de quebra conhecer uma plataforma sensacional pra fazer deploy que é a Vercel. Tudo em 22 minutos nesse vídeo feito com todo o carinho do mundo construindo uma 'Pokedex'! "
            buttonText="Front End"
          />
        </CardWrapper>
      </BannerWrapper>
      <CardsSection>
        <Cards />
      </CardsSection>
    </Container>
  );
};

export default Home;
