import classNames from "classnames";
import "./SearchDrawer.css";

export const searchDrawer = (isOpen: boolean) => ({
  className: classNames("search-drawer", { open: isOpen }),
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: isOpen ? "auto" : 0,
    transition: {
      type: "spring",
      delay: 0.2,
      damping: 20,
      stiffness: 150,
    },
  },
});

export const searchInput = {
  className: "search-input",
};
