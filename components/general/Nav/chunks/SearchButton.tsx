import { Stack } from "@/components/base/Stack";
import React from "react";
import { divider, searchButtonWrapper } from "../Nav.styles";
import { Box } from "@/components/base/Box";
import { Button } from "@/components/base/Button";

const SearchButton = ({
  setSearchOpen,
}: {
  setSearchOpen: (
    headerAction: "search" | "navigation" | null,
  ) => void | undefined;
}) => {
  return (
    <Stack {...searchButtonWrapper}>
      <Box {...divider} />
      <Button variant="navSearch" onClick={() => setSearchOpen("search")} />
    </Stack>
  );
};

export default SearchButton;
