import { useState, useEffect } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { RiEditLine } from "react-icons/ri";
import styled from "styled-components";
import Button from "../../Button";

import cardsData from "../../../json/db.json";

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
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
  color: #fff;
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 800;
`;

const ContainerCategories = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Card = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardImage = styled.img`
  width: 100%;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const Cards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(cardsData.categories);
  }, []);

  const categoryColors = {
    "FRONT END": "#6BD1FF",
    "BACK END": "#00C86F",
    MOBILE: "#FFBA05",
  };

  const getCategoryColor = (title) => categoryColors[title] || "#6BD1FF";

  return (
    <CardContainer>
      {data.map((category) => (
        <div key={category.title}>
          <CategoryTitleContainer $bgColor={getCategoryColor(category.title)}>
            <CategoryTitle>{category.title}</CategoryTitle>
          </CategoryTitleContainer>
          <ContainerCategories>
            {category.cards.map((card, index) => (
              <Card key={index}>
                <CardImage
                  src={card.image}
                  onClick={() => window.open(card.videoLick, "_blank")}
                />
                <ButtonContainer>
                  <Button
                    onClick={() => alert("Deletar card")}
                    size="small"
                    icon={IoTrashBinOutline}
                  >
                    Deletar
                  </Button>
                  <Button
                    onClick={() => alert("Editar card")}
                    size="small"
                    icon={RiEditLine}
                  >
                    Editar
                  </Button>
                </ButtonContainer>
              </Card>
            ))}
          </ContainerCategories>
        </div>
      ))}
    </CardContainer>
  );
};

export default Cards;
