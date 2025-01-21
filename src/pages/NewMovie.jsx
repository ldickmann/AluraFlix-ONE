import styled from "styled-components";
import TitleComponent from "../components/Title";
import Form from "../components/Form";
import axios from "axios";
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
      const response = await axios.post("http://localhost:5000/categories", {
        title: formData.title,
        image: formData.image,
        videoLink: formData.videoLink,
        description: formData.description,
      });
      console.log("Dados do formulário salvos:", response.data);
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
