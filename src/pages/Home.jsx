import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Cards from "../components/Card/Cards";
import styled from "styled-components";
import axios from "axios";

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
  const [categories, setCategories] = useState({
    frontend: [],
    backend: [],
    mobile: [],
    inovacao: [],
    gestao: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        console.log("response: ", response);
        if (response.status === 200) {
          const data = response.data;

          const frontend = data.filter((item) => item.category === "FRONT END");
          const backend = data.filter((item) => item.category === "BACKEND");
          const mobile = data.filter((item) => item.category === "MOBILE");
          const inovacao = data.filter((item) => item.category === "INOVAÇÃO");
          const gestao = data.filter((item) => item.category === "GESTÃO");

          setCategories({ frontend, backend, mobile, inovacao, gestao });
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
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
        {categories.frontend.map((category) => (
          <Cards
            key={category.id}
            category={category}
            setCategories={setCategories}
          />
        ))}
        {categories.backend.map((category) => (
          <Cards
            key={category.id}
            category={category}
            setCategories={setCategories}
          />
        ))}
        {categories.mobile.map((category) => (
          <Cards
            key={category.id}
            category={category}
            setCategories={setCategories}
          />
        ))}
        {categories.inovacao.map((category) => (
          <Cards
            key={category.id}
            category={category}
            setCategories={setCategories}
          />
        ))}
        {categories.gestao.map((category) => (
          <Cards
            key={category.id}
            category={category}
            setCategories={setCategories}
          />
        ))}
      </CardsSection>
    </Container>
  );
};

export default Home;
