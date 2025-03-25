"use client";
import { Button } from "../../../../base/Button";
import React, { useEffect, useRef, useState } from "react";
import { SearchInputProps } from "./SearchInput.types";
import { searchInput } from "../../SearchDrawer.styles";
import { useRouter } from "next/navigation";

const SearchInput = ({
  initialValue = "",
  placeholder = "Search",
  searchUrl = "/search",
  buttonText = "Enter to search",
  headerAction,
  setHeaderAction,
}: SearchInputProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(initialValue);
  const drawerOpen = headerAction === "search";

  useEffect(() => {
    if (drawerOpen && inputRef.current) {
      inputRef?.current?.focus();
    }

    if (!drawerOpen) {
      setTimeout(() => {
        setSearchQuery(initialValue);
      }, 300);
    }
  }, [drawerOpen]);

  const closeDrawerOnESC = (e) => {
    if (e.key === "Escape") {
      setHeaderAction && setHeaderAction(null);
      setTimeout(() => {
        setSearchQuery(initialValue);
      }, 300);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`${searchUrl}?keyword=${encodeURIComponent(searchQuery)}`);
      }}
      autoComplete="off"
    >
      <input
        ref={inputRef}
        type="text"
        name="keyword"
        placeholder={placeholder}
        value={searchQuery}
        {...searchInput}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) => closeDrawerOnESC(e)}
      />
      <Button
        href={`${searchUrl}?keyword=${encodeURIComponent(searchQuery)}`}
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
