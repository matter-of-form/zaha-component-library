"use client";
import { Box, Media, Stack, Text } from "../../../components";
import React, { useEffect, useState } from "react";
import {
  PeopleSearchOption,
  PeopleSearchProps,
} from "../CardListingGridModule.types";
import { AnimatePresence } from "framer-motion";
import {
  listingSearchBar,
  listingSearchBarResultDrawer,
  listingSearchBarResults,
  listingSearchBarResultsWrapper,
  listingSearchBarWrapper,
  listingSearchNoResult,
  listingSearchResult,
  listingSearchResultContent,
  listingSearchResultLabel,
  listingSearchResultTitle,
} from "../CardListingGridModule.styles";
import Link from "next/link";
import Arrow from "../../../assets/icons/zhaArrow.svg";

const ListingGridSearchBar = ({
  options,
  placeholder,
  focusPlaceholder,
  peopleResultCountText,
  noResultIcon,
  noResultText,
  searchResultIcon,
}: PeopleSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePlaceholder, setActivePlaceholder] =
    useState<string>(placeholder);
  const [filteredOptions, setFilteredOptions] = useState<any[]>(
    options.sort((a: PeopleSearchOption, b: PeopleSearchOption) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }),
  );

  useEffect(() => {
    const newFilteredOptions = options.filter((option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredOptions(newFilteredOptions);
  }, [searchTerm, options]);
  return (
    <Stack {...listingSearchBarWrapper}>
      <input
        type="text"
        placeholder={activePlaceholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setActivePlaceholder(focusPlaceholder)}
        onBlur={() =>
          searchTerm.length === 0 && setActivePlaceholder(placeholder)
        }
        {...listingSearchBar}
      />
      <Stack {...listingSearchBarResultDrawer}>
        <AnimatePresence>
          {searchTerm.length > 0 && (
            <Stack {...listingSearchBarResults}>
              <Text
                text={`${filteredOptions.length} <span>${peopleResultCountText}</span>`}
              />
              {filteredOptions.length > 0 ? (
                <Stack {...listingSearchBarResultsWrapper}>
                  {filteredOptions.map((option, index) => (
                    <ListingGridSearchResultCard
                      key={`peopleSearchOption-${index}`}
                      data={option}
                      icon={searchResultIcon}
                    />
                  ))}
                </Stack>
              ) : (
                <Stack {...listingSearchNoResult}>
                  {noResultIcon}
                  <Text text={noResultText} />
                </Stack>
              )}
            </Stack>
          )}
        </AnimatePresence>
      </Stack>
    </Stack>
  );
};

export default ListingGridSearchBar;

const ListingGridSearchResultCard = ({
  data,
  icon,
}: {
  data: PeopleSearchOption;
  icon: React.ReactNode;
}) => {
  return (
    <Link href={data.cta.href} {...listingSearchResult}>
      <Media data={data.image} />
      <Stack {...listingSearchResultContent}>
        <Text text={data.name} {...listingSearchResultTitle} />
        <Text text={data.title} {...listingSearchResultLabel} />
        {icon || <Arrow />}
      </Stack>
    </Link>
  );
};
