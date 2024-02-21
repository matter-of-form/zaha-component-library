import { ContentBlockVars } from "./ContentBlock.types";
import { camelToHyphen } from "../../../utils/formatting";
import classNames from "classnames";
// @ts-ignore - grabs variables from the root project's tailwind config
import mofConfig from "/mofConfig.ts";

// @ts-ignore
const { card: contentSettings } = mofConfig;
let motion: any = {};
let contentVariant: string = "primary";
let configStyle: any;

// contentBlock Props
export const contentBlockVars: ContentBlockVars = (
  variant,
  childAnims,
  classes,
) => {
  motion = childAnims;
  contentVariant = variant || "primary";
  configStyle = contentSettings[contentVariant];

  return {
    className: classNames(
      "content-block",
      [`content-block-${variant}`],
      classes,
    ),
    ...motion?.contentBlock,
  };
};

export const renderText = (name: string) => {
  const textStyles = configStyle?.textStyles?.[name] || { textStyle: "p" };

  return {
    className: camelToHyphen(name),
    ...textStyles,
    ...motion?.[name],
  };
};

export const renderButton = (name: string) => {
  const buttonStyles = configStyle?.buttons?.[name] || {};

  return {
    ...buttonStyles,
    ...motion?.[name],
  };
};

export const contentInfoTags = (motion?: Record<string, any>) => ({
  className: "info",
  ...motion,
});

export const preContent = (motion?: Record<string, any>) => ({
  className: "pre-content",
  ...motion,
});
