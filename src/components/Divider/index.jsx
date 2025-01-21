import styled from "styled-components";

const Divider = styled.hr`
  width: 100%;
  border: 1px solid var(--color-dark);
`;

const DividerComponent = () => {
  return <Divider />;
};

export default DividerComponent;
