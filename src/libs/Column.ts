import type { FunctionComponent } from "react";

export interface Column<R> {
  name: string;
  renderHeader: FunctionComponent;
  renderCell: FunctionComponent<{ row: R }>;
}
