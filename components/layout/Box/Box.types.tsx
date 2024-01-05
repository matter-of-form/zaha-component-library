import React from "react";
import { type VariantProps } from "class-variance-authority";
import { box } from "./Box.styles";
import { MotionProps } from "framer-motion";

type HTMLAndMotionProps = React.HTMLAttributes<HTMLElement> & MotionProps;

export interface BoxProps extends HTMLAndMotionProps, VariantProps<typeof box> {
  variant?: Exclude<VariantProps<typeof box>["intent"], null>;
}

export type BoxVars = (
  intent: BoxProps["intent"],
  className: BoxProps["className"],
) => Record<any, any>;
