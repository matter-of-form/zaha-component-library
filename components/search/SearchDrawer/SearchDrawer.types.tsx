export interface SearchDrawerProps {
  breakpoint: string;
  buttonText: string | any;
  /** Accessible name for the search landmark the drawer's form exposes. */
  formLabel?: string;
  placeholder: string;
  headerAction: "navigation" | "search" | null;
  setHeaderAction: (headerAction: "navigation" | "search" | null) => void;
}
