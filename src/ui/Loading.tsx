import Sizes from "open-props/src/sizes";
import styled from "styled-components";

const Container = styled.div`
  padding: ${Sizes["--size-7"]};
  text-align: center;
`;

export const Loading = () => {
  return <Container>Loading...</Container>;
};
