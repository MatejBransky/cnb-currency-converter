import Fonts from "open-props/src/fonts";
import Sizes from "open-props/src/sizes";
import styled from "styled-components";

export const PageLayout = styled.div`
  display: grid;
  grid-template-columns: clamp(23rem, 90vw, 40rem);
  gap: ${Sizes["--size-2"]};
  padding: ${Sizes["--size-fluid-1"]};
`;

export const PageHeader = styled.header`
  text-align: center;
  font-size: ${Fonts["--font-size-5"]};
  font-weight: ${Fonts["--font-weight-3"]};
  padding-top: ${Sizes["--size-1"]};
`;
