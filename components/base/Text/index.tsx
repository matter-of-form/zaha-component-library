"use client";

import { createElement, forwardRef, Ref } from "react";
import { TextProps } from "./Text.types";
import { textVars } from "./Text.styles";
import DOMPurify from "isomorphic-dompurify";
import { motion } from "framer-motion";
import { containsMotionProps } from "../../../utils";
import Link from "next/link";
import { allowedTags } from "./chunks";

export const Text = forwardRef(
  (
    {
      className,
      variant,
      text,
      textStyle = "p",
      link = {},
      rich = false,
      htag: seoTag,
      ...props
    }: TextProps,
    ref: Ref<TextProps>,
  ) => {
    const isAnimated = containsMotionProps(props); //contains framer motion props?

    if (!text && !link.text) return null;

    // HTML string - unwanted tags stripping
    const currentText = link?.text || (text as string);
    let cleanedText = currentText;

    cleanedText = DOMPurify.sanitize(currentText, {
      ALLOWED_TAGS: rich ? allowedTags.rich : allowedTags.default,
      ALLOWED_ATTR: ["class", "id", "href", "target"],
      FORBID_ATTR: ["style", "align", "color", ""],
      KEEP_CONTENT: true,
    });

    if (textStyle === "button" && variant !== "popover") {
      return text;
    }

    const isLink: boolean = !!link.text;
    const linkProps = isLink ? (({ linkType, ...rest }) => rest)(link) : {};

    if (cleanedText === "[object Object]") return null;

    const allProps = {
      // pass all styling defaults to decoupled styles file to future-proof modularity
      ...textVars(variant, textStyle, isLink, className),
      ...linkProps,
      ...props, // pass down remaining props
      dangerouslySetInnerHTML: { __html: cleanedText },
    };

    let textTag: any = link?.text ? Link : seoTag || "p";
    if (typeof textStyle === "string" && textStyle.match(/h[1-6]/)) {
      textTag = seoTag || textStyle;
    }
    if (rich) textTag = "div";

    return createElement(
      // if motion props exist on component, make this component animatable, otherwise render static Text
      isAnimated ? getMotionTag(textTag) : textTag,
      { ...allProps, ref },
    );
  },
);

Text.displayName = "Text";

const getMotionTag = (tag: any) => {
  if (typeof tag === "object") return motion(Link as any);

  const tags: any = {
    p: motion.p,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    h4: motion.h4,
    h5: motion.h5,
    h6: motion.h6,
    span: motion.span,
    a: motion.a,
    button: motion.button,
    div: motion.div,
  };

  return tags[tag] || motion.p;
};
