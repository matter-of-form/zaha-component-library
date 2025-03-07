import classNames from "classnames";
import "./SearchDrawer.css";

export const searchDrawer = (isOpen: boolean) => ({
  className: classNames("search-drawer", { open: isOpen }),
  intial: {
    height: 0,
  },
  animate: {
    height: isOpen ? "auto" : 0,
  },
});

export const searchInput = {
  className: "search-input",
};
