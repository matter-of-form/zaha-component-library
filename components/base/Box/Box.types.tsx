import React from "react";
import { type VariantProps } from "class-variance-authority";
import { box } from "./Box.styles";
import { MotionProps } from "framer-motion";

type HTMLAndMotionProps = React.HTMLAttributes<HTMLElement> & MotionProps;

export interface BoxProps extends HTMLAndMotionProps, VariantProps<typeof box> {
  motion?: boolean;
  scrollTrigger?: any;
  debug?: boolean;
  onEnter?: string;
  onEnterBack?: string;
  onLeave?: string;
  onLeaveBack?: string;
  onRefresh?: string;
  animateOnScrollDown?: boolean;
}

export type BoxVars = (
  variant: BoxProps["variant"],
  className: BoxProps["className"],
  styleProps: any,
) => Record<any, any>;
