import React from "react";
import { type VariantProps } from "class-variance-authority";
import { stack } from "./Stack.styles";
import { MotionProps } from "framer-motion";

type HTMLAndMotionProps = React.HTMLAttributes<HTMLElement> & MotionProps;

export interface StackProps
  extends HTMLAndMotionProps,
    VariantProps<typeof stack> {
  gap?: number;
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

export type StackVars = (
  direction: StackProps["direction"],
  align: StackProps["align"],
  gap: StackProps["gap"],
  className: StackProps["className"],
) => Record<any, any>;
