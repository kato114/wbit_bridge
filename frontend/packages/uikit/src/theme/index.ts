import { vars } from "@obridge/ui/css/vars.css";
import { AlertTheme } from "../components/Alert/types";
import { CardTheme } from "../components/Card/types";
import { OBridgeToggleTheme } from "../components/OBridgeToggle/types";
import { RadioTheme } from "../components/Radio/types";
import { ToggleTheme } from "../components/Toggle/theme";
import { TooltipTheme } from "../components/Tooltip/types";
import { NavThemeType } from "../widgets/Menu/theme";
import { ModalTheme } from "../widgets/Modal/types";
import { Breakpoints, MediaQueries, ZIndices } from "./types";

export interface OBridgeTheme {
  siteWidth: number;
  isDark: boolean;
  alert: AlertTheme;
  colors: typeof vars.colors;
  card: CardTheme;
  nav: NavThemeType;
  modal: ModalTheme;
  obridgeToggle: OBridgeToggleTheme;
  radio: RadioTheme;
  toggle: ToggleTheme;
  tooltip: TooltipTheme;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  spacing: typeof vars.space;
  shadows: typeof vars.shadows;
  radii: typeof vars.radii;
  zIndices: ZIndices;
}

export { darkColors, lightColors } from "./colors";
export { default as dark } from "./dark";
export { default as light } from "./light";
export * from "./types";
