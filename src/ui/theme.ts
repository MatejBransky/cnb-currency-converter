import Colors from "open-props/src/colors";
import { createTheme } from "./createTheme";

export const { theme, register } = createTheme({
  light: {
    "text-1": Colors["--gray-8"],
    "text-2": Colors["--gray-7"],
    "text-3": Colors["--gray-6"],
    "surface-0": "white",
    "surface-1": Colors["--gray-0"],
    "surface-2": Colors["--gray-1"],
    "surface-3": Colors["--gray-2"],
    "surface-4": Colors["--gray-3"],
  },
  dark: {
    "text-1": Colors["--gray-4"],
    "text-2": Colors["--gray-5"],
    "text-3": Colors["--gray-6"],
    "surface-0": Colors["--gray-10"],
    "surface-1": Colors["--gray-9"],
    "surface-2": Colors["--gray-8"],
    "surface-3": Colors["--gray-7"],
    "surface-4": Colors["--gray-6"],
  },
});
