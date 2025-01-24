import { useEffect, useState } from "react";
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
  max-width: 100%;
`;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/categorias");
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
        {loading ? (
          <p>Carregando categorias...</p>
        ) : categories && categories.length > 0 ? (
          categories.map((category) => (
            <Cards
              key={category._id}
              category={category}
              setCategories={setCategories}
              fetchCategories={fetchCategories}
            />
          ))
        ) : (
          <p>Nenhuma categoria encontrada.</p>
        )}
      </CardsSection>
    </Container>
  );
};

export default Home;
