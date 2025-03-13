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

export const listingSearchBarWrapper = {
  className: "listing-search-bar-wrapper",
};

export const listingSearchBar = {
  className: "listing-search-bar",
};

export const listingSearchBarResults = {
  className: "listing-search-bar-results",
};

export const listingSearchBarResultsWrapper = {
  className: "listing-search-bar-results-wrapper",
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
