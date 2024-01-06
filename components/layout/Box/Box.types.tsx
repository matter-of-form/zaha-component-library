import React from "react";
import { type VariantProps } from "class-variance-authority";
import { box } from "./Box.styles";
import { MotionProps } from "framer-motion";

type HTMLAndMotionProps = React.HTMLAttributes<HTMLElement> & MotionProps;

export interface BoxProps
  extends HTMLAndMotionProps,
    VariantProps<typeof box> {}

export type BoxVars = (
  variant: BoxProps["variant"],
  className: BoxProps["className"],
  colSpan?: number,
  rowSpan?: number,
) => Record<any, any>;
