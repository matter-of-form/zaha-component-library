export interface SearchDrawerProps {
  breakpoint: string;
  buttonText: string | any;
  placeholder: string;
  headerAction: "navigation" | "search" | null;
  setHeaderAction: (headerAction: "navigation" | "search" | null) => void;
}
