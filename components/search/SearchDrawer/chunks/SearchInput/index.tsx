"use client";
import { Button } from "@/components/base/Button";
import React, { useState } from "react";
import { SearchInputProps } from "./SearchInput.types";
import { searchInput } from "../../SearchDrawer.styles";

const SearchInput = ({
  initialValue = "",
  placeholder = "Search",
  searchUrl = "/search",
  buttonText = "Enter to search",
}: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialValue);

  return (
    <>
      <input
        type="text"
        name="searchQuery"
        placeholder={placeholder}
        value={searchQuery}
        {...searchInput}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        href={`${searchUrl}?q=${searchQuery}`}
        variant="search"
        text={buttonText}
        disabled={searchQuery.length < 1}
      />
    </>
  );
};

export default SearchInput;
