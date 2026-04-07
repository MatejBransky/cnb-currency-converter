import type { Column } from "../../libs/Column";
import type { ExchangeRate } from "../../model/ExchangeRate";
import * as S from "./columns.styles";

export const columns: Array<Column<ExchangeRate>> = [
  {
    name: "currency",
    renderHeader: () => <S.CurrencyHeaderCell>Currency</S.CurrencyHeaderCell>,
    renderCell: ({ row }) => (
      <S.CurrencyCell.Text>
        {row.country} - {row.currency}
      </S.CurrencyCell.Text>
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
