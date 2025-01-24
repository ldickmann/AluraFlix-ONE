import styled from "styled-components";
import TitleComponent from "../components/Title";
import Form from "../components/Form";
import { useState } from "react";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  display: flex;
  @media (max-width: 430px) {
    margin-inline: 1rem;
  }
`;

const NewMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    videoLink: "",
    description: "",
  });

  const handleSave = async (data) => {
    setFormData(data);
    try {
      // Busca as categorias para ter as opções no select
      const response = await fetch("http://localhost:3000/categorias");
      const categories = await response.json();

      // Encontra a categoria selecionada no select
      const selectedCategory = categories.find(
        (category) => category.category === data.category
      );

      if (selectedCategory) {
        //Faz a requisição POST com os dados do card e o ID da categoria selecionada
        await fetch(
          `http://localhost:3000/categorias/${selectedCategory._id}/cards`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: data.title,
              image: data.image,
              videoLink: data.videoLink,
              description: data.description,
            }),
          }
        );
      }
      setFormData({
        title: "",
        image: "",
        videoLink: "",
        description: "",
      });
      console.log("Card adicionado!");
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  return (
    <>
      <Header>
        <TitleComponent>Novo Vídeo</TitleComponent>
      </Header>
      <Section>
        <Form onSave={handleSave} />
      </Section>
    </>
  );
};

export default NewMovie;
