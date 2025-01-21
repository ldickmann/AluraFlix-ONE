import { useState, useEffect } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../Button";
import Modal from "../../Modal";
import cardsData from "../../../json/db.json";
import Carousel from "../../Carousel";

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
`;

const CardImage = styled.img`
  width: 432px;
  cursor: pointer;
  border-radius: 15px 15px 0 0;
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

const Cards = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCarousel, setIsCarousel] = useState(false);

  const categoryColors = {
    "FRONT END": "#6BD1FF",
    "BACK END": "#00C86F",
    MOBILE: "#FFBA05",
  };

  const getCategoryColor = (title) => categoryColors[title] || "#6BD1FF";

  useEffect(() => {
    setData(cardsData.categories);

    const handleResize = () => {
      const width = window.innerWidth;
      setIsCarousel(width <= 1024 && width >= 768);
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

  const handleSave = (updatedCard) => {
    setData((prevData) =>
      prevData.map((category) => ({
        ...category,
        cards: category.cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        ),
      }))
    );
    handleCloseModal();
  };

  const handleDelete = (cardId) => {
    setData((prevData) =>
      prevData.map((category) => ({
        ...category,
        cards: category.cards.filter((card) => card.id !== cardId),
      }))
    );
  };

  return (
    <CardContainer>
      {data.map((category) => (
        <div key={category.category}>
          <ContainerCategories>
            <CategoryTitleContainer
              $bgColor={getCategoryColor(category.category)}
            >
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
        </div>
      ))}
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
  data: PropTypes.array,
  categoryColors: PropTypes.object,
};

export default Cards;
