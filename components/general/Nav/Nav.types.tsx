import { type VariantProps } from "class-variance-authority";
import { StackProps, BoxProps, ButtonProps } from "../../../components";
import { nav } from "./Nav.styles";

export interface NavProps extends StackProps, VariantProps<typeof nav> {
  data?: any;
  navProps?: any;
  headerAction?: "navigation" | "search" | null;
  setHeaderAction?: (headerAction: "navigation" | "search" | null) => void;
  isActive?: boolean;
  itemsPerColumn?: number;
  displayName?: string;
  hideSearchButton?: boolean;
  searchButtonLabel?: string;
  onBreakpointChange?: (breakpoint: string) => {};
  scrollContainer?: HTMLElement;
  enableDesktopScrollLock?: boolean;
  defaultImage?: any;
  usePhotographerAsCredit?: boolean;
}

export type NavVars = (
  variant: NavProps["variant"],
  persistOn: NavProps["persistOn"],
  attach: any, //NavProps["attach"],
  className: NavProps["className"],
) => Record<any, any>;

export interface NavPanelProps extends StackProps {
  data: any;
  itemIcons?: any; // NavProps["itemIcons"];
  isActive?: boolean;
  itemIndex?: number;
  level?: number;
  attach?: string;
  image?: any;
  motion?: any;
}

type NavItem = BoxProps & ButtonProps;

export interface NavItemProps extends NavItem {
  data: any;
  itemIcons?: any; //NavProps["itemIcons"];
  collapseSiblings?: () => void;
  isActive?: boolean;
  itemIndex?: number;
  level?: number;
}

export type NavInteractionType = "click" | "hover" | "hoverOut";
