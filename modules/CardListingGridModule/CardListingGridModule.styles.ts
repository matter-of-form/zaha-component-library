import classNames from "classnames";

export const moduleWrapper = (props: any, cardType: string) => ({
  className: classNames(
    "listing-grid",
    [props.className],
    [cardType?.toLowerCase()],
  ),
});

export const gridWrapper = (motion: any) => ({
  className: "listing-grid-wrapper",
  ...motion,
});

export const resultCountWrapper = {
  className: "result-count-wrapper",
};

export const resultCountText = {
  className: "result-count-text",
};

export const listingSearchBarWrapper = {
  className: "listing-search-bar-wrapper",
};

export const listingSearchBar = {
  className: "listing-search-bar",
};

export const listingSearchBarResults = (hasResult: boolean) => ({
  className: "listing-search-bar-results",
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: hasResult ? "var(--resultDrawerHeight)" : "auto",
    opacity: 1,
  },
  exit: {
    height: 0,
    opacity: 0,
  },
  transition: {
    type: "spring",
    damping: 30,
    stiffness: 150,
  },
});

export const listingSearchBarResultsWrapper = {
  className: "listing-search-bar-results-wrapper",
  noScrollX: true,
};

export const listingSearchBarResultDrawer = {
  className: "listing-search-bar-result-drawer",
};

export const listingSearchResult = {
  className: "listing-search-result",
};

export const listingSearchResultContent = {
  className: "listing-search-result-content",
};

export const listingSearchResultTitle = {
  className: "listing-search-result-title",
};

export const listingSearchResultLabel = {
  className: "listing-search-result-label",
};

export const listingSearchNoResult = {
  className: "listing-search-no-result",
};
