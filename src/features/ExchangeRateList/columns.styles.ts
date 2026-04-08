import styled from "styled-components";
import Sizes from "open-props/src/sizes";
import Borders from "open-props/src/borders";
import Fonts from "open-props/src/fonts";
import { Flag } from "../../ui/Flag";

export const CurrencyHeaderCell = styled.div`
  text-align: left;
`;

const CurrencyCellLayout = styled.div`
  display: flex;
  align-items: center;
  gap: ${Sizes["--size-2"]};
`;

const CurrencyCellFlag = styled(Flag)`
  --size: ${Sizes["--size-8"]};
  width: var(--size);
  border-radius: ${Borders["--radius-1"]};
`;

const CurrencyCellText = styled.div`
  text-align: left;
  font-weight: ${Fonts["--font-weight-5"]};
`;

export const CurrencyCell = {
  Layout: CurrencyCellLayout,
  Flag: CurrencyCellFlag,
  Text: CurrencyCellText,
};

export const RateHeaderCell = styled.div`
  text-align: right;
`;

export const RateCell = styled.div`
  text-align: right;
`;
