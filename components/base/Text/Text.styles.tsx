import { cva } from "class-variance-authority";
import { TextVars } from "./Text.types";

// Text Base and Variant Styles
export const text = cva("text", {
  variants: {
    variant: {
      primary: ["font-primary"],
      primaryBold: ["font-primary text-bold"],
      primaryLight: ["font-primary text-light"],
      primaryItalic: ["font-primary text-italic"],
      secondary: ["font-secondary"],
      secondaryBold: ["font-secondary text-bold"],
      secondaryLight: ["font-secondary text-light"],
      secondaryItalic: ["font-secondary text-italic"],
      alternate: ["font-alternate"],
      alternateBold: ["font-alternate text-bold"],
      alternateLight: ["font-alternate text-light"],
      alternateItalic: ["font-alternate text-italic"],
    },
    textStyle: {
      "display-sm": "text-display-sm",
      "display-md": "text-display-md",
      "display-lg": "text-display-lg",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
      p: "text-p",
      "p-xxs": "text-p-xxs",
      "p-xs": "text-p-xs",
      "p-sm": "text-p-sm",
      "p-lg": "text-p-lg",
      i: "text-i",
      "i-sm": "text-i-sm",
      "i-xs": "text-i-xs",
      tag: "text-tag",
      "tag-sm": "text-tag-sm",
      quote: "text-quote",
      button: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    textStyle: "p",
  },
});

// Text Props
export const textVars: TextVars = (variant, textStyle, isLink, classes) => {
  const baseStyles = `
        ${isLink ? "text-link" : ""}
        ${classes ? classes : ""}
    `;

  return {
    className: text({
      variant,
      textStyle,
      className: baseStyles,
    }),
  };
};
