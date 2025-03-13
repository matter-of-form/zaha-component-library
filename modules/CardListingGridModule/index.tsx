"use client";
import { FC, useEffect, useState } from "react";
import {
  ListingGrid,
  ModuleBase,
  Pagination,
  SearchFilters,
  Stack,
  Text,
} from "../../components";
import { HeadingSideModule } from "../../modules";
import { gridWrapper, moduleWrapper } from "./CardListingGridModule.styles";
import { CardListingGridModuleProps } from "./CardListingGridModule.types";
import { useSearchParams } from "next/navigation";
import { areArraysEqual } from "../../utils";
import ListingGridSearchBar from "./chunks/ListingGridSearchBar";

const CardListingGridModule: FC<CardListingGridModuleProps> = ({
  data,
  moduleAnims,
  getItems = (items?: any) => [],
  getQueryData = ({}) => {},
  textStyles,
  icons,
  paginationButtonVariants,
  paginationType,
  showMoreText,
  dropdownVariant,
  peopleResultCountText,
  projectResultCountText,
  noResultText,
  ...props
}) => {
  const searchParams = useSearchParams();

  if (!data || !data?.filtersAndCards) return null;

  const {
    cards,
    cardType,
    currentPage = 1,
    displayFilters,
    filter = [],
    totalCount,
    totalPages,
    pageSize,
    sortByOptions,
    teamMembersFilter,
  } = data?.filtersAndCards;
  const [filteredCards, setFilteredCards] = useState<any[]>(cards);
  const [searchFilters, setSearchFilters] = useState<any[]>(filter);
  const [currPage, setCurrPage] = useState<number>(currentPage);
  const [currFilters, setCurrFilters] = useState<any>([]);
  const [currTotal, setCurrTotal] = useState<number>(totalPages);

  const renderSearchBar =
    cardType === "TeamMember" &&
    teamMembersFilter &&
    teamMembersFilter?.length > 0;
  const renderResultsCount =
    cardType === "TeamMember" || cardType === "Project";
  const isGroup = cards[0]?.moduleName?.includes("Group");
  let renderCardContent = null;
  if (filteredCards && filteredCards.length > 0) {
    renderCardContent = isGroup ? (
      getItems(filteredCards, isGroup)
    ) : (
      <ListingGrid
        data={getItems(filteredCards, isGroup)}
        type={filteredCards[0].moduleName}
        {...moduleAnims?.listingGrid}
      />
    );
  }

  useEffect(() => {
    const allFilters = searchParams.getAll("filterid");
    const currentPage: number = parseInt(searchParams.get("page") || "1");

    const doFiltersMatch = areArraysEqual(currFilters, allFilters);

    // if no new card info, bail fetch
    if (doFiltersMatch && currPage === currentPage) return;

    let fetchPage = currentPage;
    if (!doFiltersMatch && paginationType === "showMore") {
      fetchPage = 1;
    }

    const hasFilters = displayFilters && filter && filter.length > 0;

    const filters = hasFilters
      ? filter
          .map((category: any) => {
            const fieldGuIds = category.filters
              .filter((f: any) => allFilters?.includes(f.filterGuid))
              .map((f: any) => f.filterGuid);

            if (fieldGuIds.length > 0) {
              return {
                fieldName: category.filterValue,
                fieldGuIds,
              };
            }
            return null;
          })
          .filter((f: any) => f !== null)
      : null;

    const fetchData = async () => {
      const queryData = {
        filters,
        cardsType: cardType,
        pageSize,
        displayFilters,
        sortByOptions,
        pageNumber: fetchPage,
      };

      try {
        await getQueryData({ queryData }).then((result: any) => {
          // if load more and pageNumber++ append cards to list, otherwise replace
          let updatedCards = result?.cards || [];
          let updatedSearchFilters = result?.filter || [];
          if (paginationType === "showMore" && currPage < currentPage) {
            updatedCards = [...filteredCards, ...result.cards];
          }

          setFilteredCards(updatedCards);
          setSearchFilters(updatedSearchFilters);
          setCurrPage(currentPage);
          setCurrFilters(allFilters);
          setCurrTotal(result?.totalPages || 1);
        });
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();
  }, [searchParams]);

  const headingData = {
    description: data?.description,
    headingTitle: data?.headingTitle,
    tag: data?.tag,
  };

  return (
    <ModuleBase
      data={data}
      {...moduleWrapper(props, cardType)}
      {...moduleAnims?.module}
    >
      <HeadingSideModule
        variant="flex"
        data={headingData}
        moduleAnims={moduleAnims?.headingSide}
      />
      <Stack direction="column" {...gridWrapper(moduleAnims?.gridWrapper)}>
        {renderSearchBar && (
          <ListingGridSearchBar
            options={teamMembersFilter}
            placeholder="people directory"
            focusPlaceholder="start typing a name"
            peopleResultCountText={peopleResultCountText}
            noResultIcon={icons?.noResult}
            noResultText={noResultText}
          />
        )}
        {displayFilters && (
          <SearchFilters
            filters={searchFilters}
            icons={icons}
            textStyles={textStyles}
          />
        )}
        {renderResultsCount && (
          <Text
            text={
              cardType === "TeamMember"
                ? `${teamMembersFilter.length} <span>${peopleResultCountText || "people"}</span>`
                : `${totalCount} <span>${projectResultCountText || "projects"}</span>`
            }
            textStyle={textStyles?.result}
          />
        )}
        {renderCardContent}
        <Pagination
          totalCount={totalCount}
          pageSize={pageSize}
          totalPages={currTotal}
          currentPage={currPage}
          buttonVariants={paginationButtonVariants}
          paginationType={paginationType}
          showMoreText={showMoreText}
          textStyles={textStyles}
        />
      </Stack>
    </ModuleBase>
  );
};

export default CardListingGridModule;
