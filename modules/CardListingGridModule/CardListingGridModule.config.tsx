import { CMSModule } from "../../components";

const renderCards = (data: any, isGroup?: boolean) => {
  if (!data) return [];

  return data.map((card: any, index: number) => {
    return (
      <CMSModule
        variant="flex"
        key={`${card.moduleId}_card${isGroup ? "Group" : "Id"}-${index}`}
        module={card}
        islistingCard={!isGroup}
      />
    );
  });
};

const getQueryData = (
  currentPage: string,
  filters: any[],
  cardsType: string,
  pageSize = 10,
  displayFilters = true,
  orderBy: any[],
) => {
  return {
    query: {
      pageId: 1460,
      cardsType,
      pageNumber: parseInt(currentPage),
      pageSize,
      displayFilters,
      orderBy,
      filters,
    },
    fetchUrl:
      "https://zhweb-qa-a-app.azurewebsites.net/umbraco/api/CardListingFilter/GetCards",
  };
};

const cardListingConfig = {
  getItems: renderCards,
  getQueryData,
  compactFilterTitle: "Filter",
};

export default cardListingConfig;
