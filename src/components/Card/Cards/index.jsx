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
  width: 100%;
  overflow-x: hidden;
`;

const CategoryTitleContainer = styled.div`
  width: 432px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background: ${(props) => props.$bgColor || "#6BD1FF"};
  margin: 20px auto;

  @media (max-width: 430px) {
    width: 300px;
    margin: 20px 0px 15px 20px;
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
  margin: 2rem 0rem 1rem 0rem;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 4px solid ${(props) => props.color};
  border-radius: 15px;
  margin: 0 10px;

  @media (max-width: 430px) {
    width: 100%;
  }
`;

const CardImage = styled.img`
  width: 432px;
  cursor: pointer;
  border-radius: 15px 15px 0 0;

  @media (max-width: 430px) {
    width: 100%;
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

const Cards = ({ category, setCategories, fetchCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCarousel, setIsCarousel] = useState(false);
  const [cards, setCards] = useState(category.cards);

  const categoryColors = {
    FRONTEND: "#6BD1FF",
    BACKEND: "#00C86F",
    MOBILE: "#FFBA05",
    INOVAÇÃO: "#FF4C61",
    GESTÃO: "#FF7A05",
  };

  const getCategoryColor = (title) => categoryColors[title] || "#6BD1FF";

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsCarousel(width <= 1024 && width >= 320);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCards(category.cards); // Atualiza os cards quando a categoria mudar
  }, [category]);

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const handleSave = async () => {
    try {
      // Atualiza os cards no estado e backend após salvar no modal
      const response = await axios.get("http://localhost:5000/categories");
      if (response.status === 200) {
        const updatedCategory = response.data.find(
          (cat) => cat.id === category.id
        );
        setCards(updatedCategory.cards);
        setCategories(response.data);
        fetchCategories();
        closeModal();
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
      // Remove o card do estado local antes de atualizar o backend
      const updatedCards = cards.filter((card) => card.id !== cardId);
      setCards(updatedCards);

      // Atualiza o backend
      const response = await axios.get("http://localhost:5000/categories");
      if (response.status === 200) {
        const categories = response.data;
        const categoryToUpdate = categories.find((category) =>
          category.cards.some((card) => card.id === cardId)
        );

        if (categoryToUpdate) {
          const updatedCategory = {
            ...categoryToUpdate,
            cards: updatedCards,
          };

          const updateResponse = await axios.put(
            `http://localhost:5000/categories/${categoryToUpdate.id}`,
            updatedCategory
          );

          if (updateResponse.status === 200) {
            fetchCategories(); // Atualiza o estado global com as categorias atualizadas
            console.log("Card deletado");
          } else {
            console.error("Erro ao atualizar categoria:", updateResponse);
          }
        } else {
          console.error("Erro: categoria não encontrada.");
        }
      } else {
        console.error("Erro ao buscar os dados", response);
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
          {cards.map((card) => (
            <StyledCard
              key={card.id}
              color={getCategoryColor(category.category)}
            >
              <CardImage
                src={card.image}
                // onClick={() => window.open(card.videoLink, "_blank")}
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
          onClose={closeModal}
          cardData={selectedCard}
          onSave={handleSave}
        />
      )}
    </CardContainer>
  );
};

Cards.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    categoryColor: PropTypes.string,
    hoverColor: PropTypes.string,
    bgColor: PropTypes.string,
    cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.string,
        videoLink: PropTypes.string,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setCategories: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

export default Cards;
