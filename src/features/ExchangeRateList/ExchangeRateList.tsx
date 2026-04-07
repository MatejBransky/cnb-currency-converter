import { useExchangeRates } from "../../api/useExchangeRates";
import { columns } from "./columns";

export const ExchangeRateList = () => {
  const { data } = useExchangeRates();
  return (
    <table data-testid="exchange-rate-list">
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
            {columns.map((column) => (
              <td key={column.name}>
                <column.renderCell row={row} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
