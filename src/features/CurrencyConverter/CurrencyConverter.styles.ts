import Fonts from "open-props/src/fonts";
import { CustomMedia } from "open-props/src/media";
import Sizes from "open-props/src/sizes";
import styled from "styled-components";
import { theme } from "../../ui/theme";

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${Sizes["--size-3"]};

  @media ${CustomMedia["--md-n-above"]} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Input = styled.input``;

export const Output = styled.output`
  padding-block: ${Sizes["--size-1"]};
`;

export const Select = styled.select``;

export const Description = styled.p`
  color: ${theme["text-2"]};
  font-size: ${Fonts["--font-size-fluid-0"]};
`;

export const Fieldset = styled.fieldset`
  display: grid;
  gap: ${Sizes["--size-2"]};
  padding-left: ${Sizes["--size-4"]};

  ${Input} {
    margin-left: -${Sizes["--size-2"]};
  }

  ${Select} {
    margin-left: -${Sizes["--size-3"]};
  }

  ${Description} {
    padding-top: ${Sizes["--size-1"]};
  }
`;

export const Field = styled.div`
  display: grid;
  gap: ${Sizes["--size-1"]};
`;

export const Label = styled.label`
  display: grid;
  align-items: center;
  gap: ${Sizes["--size-2"]};
  color: ${theme["text-2"]};
`;

export const ExchangeRateMeta = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  gap: ${Sizes["--size-3"]};

  time {
    color: ${theme["text-2"]};
  }
`;
