import Borders from "open-props/src/borders";
import Fonts from "open-props/src/fonts";
import styled from "styled-components";
import { theme } from "../../ui/theme";

export const Table = styled.table`
  width: 100%;
  font-size: ${Fonts["--font-size-2"]};

  tbody tr:last-child td:last-child {
    border-end-end-radius: ${Borders["--border-size-1"]};
  }

  tbody th {
    background-color: ${theme["surface-1"]};
  }

  tbody tr:hover th {
    background-color: ${theme["surface-3"]};
  }
`;
