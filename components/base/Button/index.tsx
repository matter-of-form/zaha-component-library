"use client";
import { createElement, forwardRef, ReactNode, Ref, useCallback } from "react";
import { ButtonProps } from "./Button.types";
import { buttonVars } from "./Button.styles";
import { motion } from "framer-motion";
import { Stack, Text } from "../../../components";
import { containsMotionProps } from "../../../utils";
import { useRouter } from "next/navigation";
// @ts-ignore - mof overrides
import mofConfig from "/mofConfig";
import Link from "next/link";

export const Button = forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      text,
      onClick,
      iconPre: propsIconPre,
      iconPost: propsIconPost,
      linkType,
      href,
      target,
      textStyle,
      isLoading = false,
      disabled = false,
      loadingState = "Loading...",
      ...props
    }: ButtonProps,
    ref: Ref<any>,
  ) => {
    // const router = useRouter();

    // set icon from config, unless overrideen by props
    const iconPre =
      propsIconPre || mofConfig?.button?.[variant as "primary"]?.icons?.iconPre;
    const iconPost =
      propsIconPost ||
      mofConfig?.button?.[variant as "primary"]?.icons?.iconPost;

    const renderText = !mofConfig?.button?.[variant as "primary"]?.omitText;
    const configText = mofConfig?.button?.[variant as "primary"]?.text;

    const handleClick = useCallback(
      (e: MouseEvent) => {
        if (onClick) {
          onClick(e);
        }

        // if (href) {
        //   target === "_blank"
        //     ? // @ts-ignore
        //       window.open(href, "_blank")
        //     : router.push(href);
        // }
      },
      [onClick],
    );

    const allProps = {
      ...buttonVars(variant, size, linkType, className, isLoading), // pass all styling defaults to decoupled styles file to future-proof modularity
      onClick: (e: any) => handleClick(e),
      ...(variant === "submit" && { type: "submit" as const }),
      disabled,
      ...(href && {
        href,
        target,
        rel: target === "_blank" ? "noopener noreferrer" : undefined,
        "aria-label": `${text || configText} ${target === "_blank" ? "opens in a new tab" : ""}`,
        title: text || configText,
      }), // only add link props if href is provided

      ...props, // pass down remaining props
      ...mofConfig?.button?.[variant as "primary"], // mofConfig overrides
    };

    const isAnimated = containsMotionProps(allProps); //contains framer motion props?

    const buttonMain = renderText ? (
      <Text
        variant={variant === "popover" ? variant : null}
        text={text || configText}
        textStyle={textStyle || "button"}
      />
    ) : null;
    let buttonContent: ReactNode | any[] = buttonMain;

    if (!text && !configText && !iconPre && !iconPost) return null;

    if (iconPre || iconPost || loadingState) {
      buttonContent = (
        <Stack>
          {iconPre}
          {buttonMain}
          {iconPost}
          {isLoading && loadingState}
        </Stack>
      );
    }

    let element: any = "button";

    if (isAnimated) {
      element = href ? motion.a : motion.button;
    } else if (href) {
      element = linkType === "Media" || linkType === "External" ? "a" : Link;
    }

    return createElement(element, { ...allProps, ref }, buttonContent);
  },
);

Button.displayName = "Button";
