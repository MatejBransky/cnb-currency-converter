import Fonts from "open-props/src/fonts";
import { CustomMedia } from "open-props/src/media";
import Sizes from "open-props/src/sizes";
import Borders from "open-props/src/borders";
import styled, { css } from "styled-components";
import { theme } from "../../ui/theme";
import { Flag } from "../../ui/Flag";

export const Form = styled.form`
  display: grid;
  gap: ${Sizes["--size-3"]};
  font-size: ${Fonts["--font-size-3"]};

  @media ${CustomMedia["--sm-n-above"]} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Label = styled.label`
  display: grid;
  align-items: center;
  gap: ${Sizes["--size-2"]};
  color: ${theme["text-2"]};
  font-size: ${Fonts["--font-size-1"]};
`;

const editable = css`
  background-color: ${theme["surface-0"]};
  border: ${Borders["--border-size-1"]} solid ${theme["surface-4"]};
`;

export const Input = styled.input`
  ${editable}
`;

export const Output = styled.output`
  padding-block: ${Sizes["--size-1"]};
  padding-inline: ${Sizes["--size-2"]};
  border: ${Borders["--border-size-1"]} dashed ${theme["surface-4"]};
  border-radius: ${Borders["--radius-2"]};
`;

export const Select = styled.select`
  ${editable}
  appearance: base-select;
  padding-block: ${Sizes["--size-1"]};
  padding-inline: ${Sizes["--size-2"]};
`;

const DescriptionLayout = styled.div`
  --flag-size: ${Sizes["--size-8"]};

  display: grid;
  grid-template-columns: auto var(--flag-size);
  align-items: center;
  justify-items: start;
  justify-content: space-between;
  gap: ${Sizes["--size-2"]};
  padding-inline: ${Sizes["--size-1"]};
  padding-block: ${Sizes["--size-1"]};
  border: ${Borders["--border-size-1"]} dashed ${theme["surface-4"]};
  border-radius: ${Borders["--radius-2"]};
`;

const DescriptionFlag = styled(Flag)`
  width: var(--flag-size);
  border-radius: ${Borders["--radius-1"]};
`;

const DescriptionText = styled.p`
  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  color: ${theme["text-3"]};
  font-size: ${Fonts["--font-size-1"]};
`;

export const Description = {
  Layout: DescriptionLayout,
  Flag: DescriptionFlag,
  Text: DescriptionText,
};

export const Fieldset = styled.fieldset`
  display: grid;
  grid-template-columns: 4fr minmax(
      calc(${Sizes["--size-10"]} + ${Sizes["--size-2"]}),
      auto
    );
  grid-template-areas:
    "amount currency"
    "description description";
  gap: ${Sizes["--size-3"]};
  padding-left: ${Sizes["--size-4"]};

  ${Label} {
    padding-inline-start: ${Sizes["--size-1"]};
  }

  ${Input}, ${Select}, ${Output} {
    min-width: 0;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
  }

  ${Description.Layout} {
    grid-area: description;
  }
`;

export const Field = styled.div<{ $area: "amount" | "currency" }>`
  display: grid;
  gap: ${Sizes["--size-1"]};
  grid-area: ${(p) => p.$area};

  *:not(label) {
    font-weight: ${Fonts["--font-weight-5"]};
  }
`;

export const ExchangeRateMeta = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${Sizes["--size-3"]};
  color: ${theme["text-2"]};

  mark {
    white-space: nowrap;
    color: ${theme["text-mark"]};
    background: none;
  }

  time {
    background-color: ${theme["surface-3"]};
    padding-inline: ${Sizes["--size-2"]};
    padding-block: ${Sizes["--size-1"]};
    border-radius: ${Borders["--radius-2"]};
  }
`;
