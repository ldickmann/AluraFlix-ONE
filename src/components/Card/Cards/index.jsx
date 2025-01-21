import { useState, useEffect } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../Button";
import Modal from "../../Modal";
import Carousel from "../../Carousel";
import axios from "axios";

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
`;

const CategoryTitleContainer = styled.div`
  display: flex;
  width: 432px;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: ${(props) => props.$bgColor || "#6BD1FF"};
  margin: 20px auto;

  @media (max-width: 430px) {
    width: 70%;
    margin: 20px 0px 15px 8px; 
  }
`;

const CategoryTitle = styled.h2`
  color: var(--color-white);
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 800;
`;

const ContainerCategories = styled.div`
  display: flex;
  justify-self: flex-start;
  margin: 0 0 10px 20px;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 4px solid ${(props) => props.color};
  border-radius: 15px;
  margin: 0 10px;
  width: 90%;

  @media (max-width: 430px) {
  }
`;

const CardImage = styled.img`
  width: 432px;
  cursor: pointer;
  border-radius: 15px 15px 0 0;

  @media (max-width: 430px) {
    width: 100%;
    height: 260.85px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
  width: 100%;
  height: 59px;
  border-top: 4px solid ${(props) => props.color};
`;

const Cards = ({ category, setCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCarousel, setIsCarousel] = useState(false);

  const categoryColors = {
    FRONTEND: "#6BD1FF",
    BACKEND: "#00C86F",
    MOBILE: "#FFBA05",
  };

  const getCategoryColor = (title) => categoryColors[title] || "#6BD1FF";

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsCarousel(width <= 1024 && width >= 768) || width < 430;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleSave = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories");
      if (response.status === 200) {
        const data = response.data;
        const frontend = data.filter((item) => item.category === "FRONT END");
        const backend = data.filter((item) => item.category === "BACKEND");
        const mobile = data.filter((item) => item.category === "MOBILE");
        const inovacao = data.filter((item) => item.category === "INOVAÇÃO");
        const gestao = data.filter((item) => item.category === "GESTÃO");

        setCategories({ frontend, backend, mobile, inovacao, gestao });
        handleCloseModal();
        console.log("Dados atualizados");
      } else {
        console.error("Erro ao buscar os dados", response);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/categories/${cardId}`
      );
      if (response.status === 200) {
        const response = await axios.get("http://localhost:5000/categories");
        if (response.status === 200) {
          const data = response.data;
          const frontend = data.filter((item) => item.category === "FRONT END");
          const backend = data.filter((item) => item.category === "BACKEND");
          const mobile = data.filter((item) => item.category === "MOBILE");
          const inovacao = data.filter((item) => item.category === "INOVAÇÃO");
          const gestao = data.filter((item) => item.category === "GESTÃO");

          setCategories({ frontend, backend, mobile, inovacao, gestao });
          console.log("Card deletado");
        } else {
          console.error("Erro ao buscar os dados", response);
        }
      } else {
        console.error("Erro ao deletar card:", response);
      }
    } catch (error) {
      console.error("Erro ao deletar card:", error);
    }
  };

  return (
    <CardContainer>
      <ContainerCategories>
        <CategoryTitleContainer $bgColor={getCategoryColor(category.category)}>
          <CategoryTitle>{category.category}</CategoryTitle>
        </CategoryTitleContainer>
      </ContainerCategories>
      {isCarousel ? (
        <Carousel
          category={category}
          handleDelete={handleDelete}
          handleEditClick={handleEditClick}
        />
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {category.cards.map((card) => (
            <StyledCard
              key={card.id}
              color={getCategoryColor(category.category)}
            >
              <CardImage
                src={card.image}
                onClick={() => window.open(card.videoLink, "_blank")}
              />
              <ButtonContainer color={getCategoryColor(category.category)}>
                <Button
                  className={"card-button"}
                  onClick={() => handleDelete(card.id)}
                  size="small"
                  icon={IoTrashBinOutline}
                >
                  Deletar
                </Button>
                <Button
                  className={"card-button"}
                  onClick={() => handleEditClick(card)}
                  size="small"
                  icon={RiEditLine}
                >
                  Editar
                </Button>
              </ButtonContainer>
            </StyledCard>
          ))}
        </div>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          cardData={selectedCard}
          onSave={handleSave}
        />
      )}
    </CardContainer>
  );
};

Cards.propTypes = {
  category: PropTypes.shape({
    category: PropTypes.string.isRequired,
    categoryColor: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        videoLink: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default Cards;
