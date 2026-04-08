import type { ExchangeRate } from "../../model/ExchangeRate";
import * as S from "./columns.styles";

import type { FunctionComponent } from "react";

export interface Column<R> {
  name: string;
  renderHeader: FunctionComponent;
  renderCell: FunctionComponent<{ row: R }>;
}

export const columns: Array<Column<ExchangeRate>> = [
  {
    name: "currency",
    renderHeader: () => <S.CurrencyHeaderCell>Currency</S.CurrencyHeaderCell>,
    renderCell: ({ row }) => (
      <S.CurrencyCell.Layout>
        <S.CurrencyCell.Flag country={row.country} />
        <S.CurrencyCell.Text>
          {row.country} - {row.currency}
        </S.CurrencyCell.Text>
      </S.CurrencyCell.Layout>
    ),
  },
  {
    name: "rate",
    renderHeader: () => <S.RateHeaderCell>Rate</S.RateHeaderCell>,
    renderCell: ({ row }) => (
      <S.RateCell>
        {row.amount} {row.code} = {row.rate} CZK
      </S.RateCell>
    ),
  },
];
