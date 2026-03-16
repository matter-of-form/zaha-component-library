"use client";
import { FC } from "react";
import { Box, Button, Tooltip } from "../../../components";
import { shareLink } from "./ShareTooltip.styles";
// @ts-ignore - mof overrides
import mofConfig from "/mofConfig";
import { usePathname } from "next/navigation";

const shareIcons = mofConfig.shareIcons || {};

const ShareTooltip: FC<any> = ({ data }) => {
  const pathName = usePathname();

  const handleGetLink = (link: string, id: string) => {
    let newLink = link;
    if (
      id === "email" &&
      !link.includes("subject=") &&
      data?.emailSharingSubject
    ) {
      newLink = link.replace("?", `?subject=${data?.emailSharingSubject}`);
    }

    if (id === "copy" && navigator) {
      navigator.clipboard.writeText(link);
    } else {
      if (typeof window !== undefined) {
        window.open(newLink, "_blank");
      }
    }
  };

  const availLinks = Object.entries(data).filter(([key]) => {
    return key?.includes("SharingLink");
  });

  if (shareIcons?.copy) {
    const hasCopySharingLink = availLinks.some(
      ([key]) => key === "copySharingLink",
    );
    if (!hasCopySharingLink) {
      availLinks.push([
        "copySharingLink",
        `${process.env.RESOURCE_PATH || "https://qa.zaha-hadid.com/"}${pathName.startsWith("/") ? pathName.substring(1) : pathName}`,
      ]);
    }
  }

  const renderShareLinks = availLinks.map(([key, value]) => {
    const shareKey = key.replace("SharingLink", "");
    const icon = shareIcons[shareKey];

    return (
      <Box
        key={`shareLink_${key}`}
        onClick={() => handleGetLink(value as string, shareKey)}
        {...shareLink(shareKey)}
      >
        {icon}
      </Box>
    );
  });

  return (
    <Tooltip content={renderShareLinks}>
      <Button variant="share" text={data?.shareTitle || "Share"} />
    </Tooltip>
  );
};

export default ShareTooltip;
