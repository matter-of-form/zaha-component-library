"use client";
import { Button } from "../../../../base/Button";
import React, { useState } from "react";
import { SearchInputProps } from "./SearchInput.types";
import { searchInput } from "../../SearchDrawer.styles";
import { useRouter } from "next/navigation";

const SearchInput = ({
  initialValue = "",
  placeholder = "Search",
  searchUrl = "/search",
  buttonText = "Enter to search",
}: SearchInputProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(initialValue);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`${searchUrl}?keyword=${searchQuery}`);
      }}
    >
      <input
        type="text"
        name="keyword"
        placeholder={placeholder}
        value={searchQuery}
        {...searchInput}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        href={`${searchUrl}?keyword=${searchQuery}`}
        onClick={(e) => e.preventDefault()}
        type="submit"
        variant="search"
        text={buttonText}
        disabled={searchQuery.length < 1}
      />
    </form>
  );
};

export default SearchInput;
