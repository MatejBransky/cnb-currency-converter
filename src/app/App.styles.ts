import Fonts from "open-props/src/fonts";
import Sizes from "open-props/src/sizes";
import styled from "styled-components";

export const PageLayout = styled.div`
  display: grid;
  place-items: center;
  gap: ${Sizes["--size-2"]};
  padding: ${Sizes["--size-2"]};
`;

export const PageHeader = styled.header`
  font-size: ${Fonts["--font-size-5"]};
  font-weight: ${Fonts["--font-weight-2"]};
`;
