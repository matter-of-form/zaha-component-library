"use client";
import { FC, useRef, useEffect } from "react";
import Lenis from "lenis";
import { isMobile } from "react-device-detect";
import { SmoothScrollProps } from "./SmoothScroll.types";

export const SmoothScroll: FC<SmoothScrollProps> = ({
  onLoaded = () => {},
  main = true,
  ...props
}) => {
  const lenisRef = useRef<Lenis | undefined>(undefined);
  const rafHandleRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) return;

    // Initialize Lenis on the first render
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        ...props,
        prevent: (node) =>
          node.classList.contains("listing-search-bar-results-wrapper") ||
          node.classList.contains("popover-content"),
      });
      onLoaded(lenisRef.current);

      if (typeof window !== undefined && main) {
        // @ts-ignore
        window.mainScroll = lenisRef.current;
      }

      const raf = (time: number) => {
        lenisRef.current?.raf(time);
        rafHandleRef.current = requestAnimationFrame(raf);
      };
      rafHandleRef.current = requestAnimationFrame(raf);
    }

    // Clean up on component unmount
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = undefined;
      }
      if (rafHandleRef.current) {
        cancelAnimationFrame(rafHandleRef.current);
        rafHandleRef.current = null;
      }
    };
  }, []);

  return null;
};

export default SmoothScroll;
