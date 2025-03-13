"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "../../base/Button";

const ClearAllButton = ({ buttonText }: { buttonText: string }) => {
  const searchParams = useSearchParams();
  const handleClearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filterid");
    params.delete("page");
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return <Button text={buttonText} onClick={handleClearAllFilters} />;
};

export default ClearAllButton;
