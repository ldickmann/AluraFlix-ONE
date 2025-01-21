import styled from "styled-components";
import TitleComponent from "../components/Title";
import Form from "../components/Form";

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.section`
  display: flex;
`;

const NewMovie = () => {
  return (
    <>
      <Header>
        <TitleComponent>Novo Vídeo</TitleComponent>
      </Header>
      <Section>
        <Form />
      </Section>
    </>
  );
};

export default NewMovie;
