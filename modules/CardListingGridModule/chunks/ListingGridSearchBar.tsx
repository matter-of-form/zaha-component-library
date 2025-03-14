"use client";
import { Button, Media, Stack, Text } from "../../../components";
import React, { useEffect, useRef, useState } from "react";
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
import { remove } from "diacritics";
import Arrow from "../../../assets/icons/zhaArrow.svg";

const ListingGridSearchBar = ({
  options,
  placeholder,
  focusPlaceholder,
  peopleResultCountText,
  noResultIcon,
  noResultText,
  searchResultIcon,
  searchIcon,
  deleteIcon,
}: PeopleSearchProps) => {
  const sortedOptions: PeopleSearchOption[] = options.sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activePlaceholder, setActivePlaceholder] =
    useState<string>(placeholder);
  const [activeIcon, setActiveIcon] = useState<React.ReactNode>(searchIcon);
  const [filteredOptions, setFilteredOptions] =
    useState<PeopleSearchOption[]>(sortedOptions);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newFilteredOptions = options
      .filter((option) =>
        remove(option.name)
          .toLowerCase()
          .includes(remove(searchTerm).toLowerCase()),
      )
      .sort(
        (a, b) =>
          remove(a.name)
            .toLowerCase()
            .indexOf(remove(searchTerm).toLowerCase()) -
          remove(b.name)
            .toLowerCase()
            .indexOf(remove(searchTerm).toLowerCase()),
      );

    setFilteredOptions(newFilteredOptions);
  }, [searchTerm, options]);

  return (
    <Stack {...listingSearchBarWrapper}>
      <div>
        <input
          type="text"
          placeholder={activePlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            setActivePlaceholder(focusPlaceholder);
            setActiveIcon(deleteIcon);
          }}
          onBlur={() => {
            if (searchTerm.length === 0) {
              setActivePlaceholder(placeholder);
              setActiveIcon(searchIcon);
            }
          }}
          {...listingSearchBar}
        />
        <Button onClick={() => setSearchTerm("")} iconPost={activeIcon} />
      </div>
      <Stack {...listingSearchBarResultDrawer}>
        <AnimatePresence>
          {searchTerm.length > 0 && (
            <Stack {...listingSearchBarResults}>
              <Text
                text={`${filteredOptions.length} <span>${peopleResultCountText}</span>`}
              />
              {filteredOptions.length > 0 ? (
                <Stack
                  {...listingSearchBarResultsWrapper}
                  ref={drawerRef}
                  onScroll={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  {filteredOptions.map((option) => (
                    <ListingGridSearchResultCard
                      key={`peopleSearchOption-${option.cta.href}`}
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
    <Link href={data.cta.href} {...listingSearchResult} prefetch>
      <Media data={data.image} />
      <Stack {...listingSearchResultContent}>
        <Text text={data.name} {...listingSearchResultTitle} />
        <Text text={data.title} {...listingSearchResultLabel} />
        {icon || <Arrow />}
      </Stack>
    </Link>
  );
};
