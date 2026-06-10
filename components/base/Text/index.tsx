"use client";

import { createElement, forwardRef, Ref } from "react";
import { TextProps } from "./Text.types";
import { textVars } from "./Text.styles";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { motion } from "framer-motion";
import { containsMotionProps } from "../../../utils";
import Link from "next/link";
import { allowedTags } from "./chunks";

const purify = DOMPurify(new JSDOM("<!DOCTYPE html>").window);

const sanitize = (text: string, rich: boolean) =>
  purify.sanitize(text, {
    ALLOWED_TAGS: rich ? allowedTags.rich : allowedTags.default,
    ALLOWED_ATTR: ["class", "id", "href", "target"],
    FORBID_ATTR: ["style", "align", "color", ""],
    KEEP_CONTENT: true,
  });

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
    const isAnimated = containsMotionProps(props);
    const currentText = link?.text || (text as string) || "";
    const displayText = currentText ? sanitize(currentText, rich) : "";

    if (!text && !link.text) return null;

    if (textStyle === "button" && variant !== "popover") {
      return text;
    }

    const isLink: boolean = !!link.text;
    const linkProps = isLink ? (({ linkType, ...rest }) => rest)(link) : {};

    if (displayText === "[object Object]") return null;

    const allProps = {
      ...textVars(variant, textStyle, isLink, className),
      ...linkProps,
      ...props,
      dangerouslySetInnerHTML: { __html: displayText },
    };

    let textTag: any = link?.text ? Link : seoTag || "p";
    if (typeof textStyle === "string" && textStyle.match(/h[1-6]/)) {
      textTag = seoTag || textStyle;
    }
    if (rich) textTag = "div";

    return createElement(isAnimated ? getMotionTag(textTag) : textTag, {
      ...allProps,
      ref,
    });
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
