import React from "react";

export type CardListingGridModuleProps = {
  data: any;
  moduleAnims?: any;
  getItems?: (items?: any, isGroup?: boolean) => any;
  getQueryData?: ({}: any) => any;
  textStyles?: any;
  icons?: any;
  searchParams?: any;
  paginationButtonVariants?: any;
  paginationType?: any;
  showMoreText?: any;
  dropdownVariant?: string;
  peopleResultCountText: string;
  projectResultCountText: string;
  peopleSearchPlaceholder: string;
  peopleSearchActivePlaceholder: string;
  noResultText: string;
};

export type PeopleSearchOption = {
  name: string;
  title: string;
  image: {
    imageUrl: string;
    mediaId: number;
    caption?: string;
    imageAlt?: string;
    imageCredit?: string;
    photographer?: string;
    isSvg: boolean;
    isVideo: boolean;
  };
  cta: {
    text: string;
    href: string;
    linkType: string;
    target: string | null;
  };
};

export type PeopleSearchProps = {
  options: PeopleSearchOption[];
  placeholder: string;
  focusPlaceholder: string;
  peopleResultCountText: string;
  noResultIcon: React.ReactNode;
  noResultText: string;
  searchResultIcon: React.ReactNode;
};
