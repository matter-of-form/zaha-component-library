export interface SearchInputProps {
  initialValue?: string;
  placeholder?: string;
  searchUrl?: string;
  buttonText?: string;
  /** Accessible name for the search landmark the form exposes. */
  formLabel?: string;
  headerAction?: "navigation" | "search" | null;
  setHeaderAction?: (headerAction: "navigation" | "search" | null) => void;
}
