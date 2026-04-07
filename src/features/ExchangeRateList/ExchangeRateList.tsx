import { useExchangeRates } from "../../api/useExchangeRates";
import { columns } from "./columns";
import * as S from "./ExchangeRateList.styles";

export const ExchangeRateList = () => {
  const { data } = useExchangeRates();
  return (
    <S.Table data-testid="exchange-rate-list">
      <caption>Currency List</caption>

      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.name}>
              <column.renderHeader />
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.rows.map((row) => (
          <tr key={row.code}>
            {columns.map((column, index) =>
              index === 0 ? (
                <th key={column.name}>
                  <column.renderCell row={row} />
                </th>
              ) : (
                <td key={column.name}>
                  <column.renderCell row={row} />
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </S.Table>
  );
};
