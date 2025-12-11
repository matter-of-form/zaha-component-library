import React from "react";
import { MotionProps } from "framer-motion";

type HTMLAndMotionProps = React.HTMLAttributes<HTMLElement> & MotionProps;

export interface GridProps extends HTMLAndMotionProps {
  className?: string;
  gap?: number;
  rows?: number;
  cols?: number;
  props?: any;
  scrollTrigger?: any;
  debug?: boolean;
  onEnter?: string;
  onEnterBack?: string;
  onLeave?: string;
  onLeaveBack?: string;
  onRefresh?: string;
  animateOnScrollDown?: boolean;
}

export type GridVars = (
  rows: GridProps["rows"],
  cols: GridProps["cols"],
  gap: GridProps["gap"],
  className: GridProps["className"],
) => Record<any, any>;
