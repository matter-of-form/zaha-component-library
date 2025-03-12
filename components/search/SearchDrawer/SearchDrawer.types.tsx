export interface SearchDrawerProps {
  breakpoint: string;
  buttonText: string | any;
  headerAction: "navigation" | "search" | null;
  setHeaderAction: (headerAction: "navigation" | "search" | null) => void;
}
