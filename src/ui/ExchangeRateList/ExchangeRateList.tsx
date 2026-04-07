import type { ExchangeRate } from "../../model/ExchangeRate";
import { columns } from "./columns";

interface ExchangeRateListProps {
  items: ExchangeRate[];
}

export const ExchangeRateList = (props: ExchangeRateListProps) => {
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
        {props.items.map((row) => (
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
