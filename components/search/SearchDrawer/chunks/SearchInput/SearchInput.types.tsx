export interface SearchInputProps {
  initialValue?: string;
  placeholder?: string;
  searchUrl?: string;
  buttonText?: string;
  headerAction: "navigation" | "search" | null;
  setHeaderAction: (headerAction: "navigation" | "search" | null) => void;
}
