"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../base/Button";

const ClearAllButton = ({ buttonText }: { buttonText: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("filterid");
    params.delete("page");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return <Button text={buttonText} onClick={handleClearAllFilters} />;
};

export default ClearAllButton;
