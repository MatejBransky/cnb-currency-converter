import Fonts from "open-props/src/fonts";
import Sizes from "open-props/src/sizes";
import type { FallbackProps } from "react-error-boundary";
import styled from "styled-components";
import { theme } from "./theme";

const Container = styled.div`
  text-align: center;
  padding: ${Sizes["--size-7"]};
`;

const Text = styled.p`
  color: ${theme["text-2"]};
`;

const Button = styled.button`
  font-size: ${Fonts["--font-size-fluid-0"]};
  padding-inline: ${Sizes["--size-6"]};
  padding-block: ${Sizes["--size-3"]};
`;

export const ErrorFallback = (props: FallbackProps) => {
  return (
    <Container>
      <h2>Something went wrong</h2>
      <Text>{String(props.error)}</Text>
      <Button onClick={props.resetErrorBoundary}>Try again</Button>
    </Container>
  );
};
