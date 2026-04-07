import Borders from "open-props/src/borders";
import Fonts from "open-props/src/fonts";
import { createGlobalStyle, css } from "styled-components";
import "./init.css";
import { register, theme } from "./theme";

const defaults = css`
  :root {
    ${register("light")}
  }

  @media (prefers-color-scheme: dark) {
    :root {
      ${register("dark")}
    }
  }

  html {
    font-size: ${Fonts["--font-size-fluid-0"]};
    font-family: ${Fonts["--font-system-ui"]};
    color: ${theme["text-1"]};
    background: ${theme["surface-1"]};
  }

  table {
    border-radius: ${Borders["--radius-2"]};
  }

  #root {
    display: grid;
    place-content: center;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${defaults}
`;
