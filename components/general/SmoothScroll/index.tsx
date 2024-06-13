"use client";
import { FC, useRef, useEffect } from "react";
import Lenis from "lenis";
import { isMobile } from "react-device-detect";

export const SmoothScroll: FC<any> = ({ onLoaded, ...props }) => {
  const lenisRef = useRef<Lenis | undefined>(undefined);
  const rafHandleRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) return;

    // Initialize Lenis on the first render
    if (!lenisRef.current) {
      onLoaded(lenisRef.current);
      lenisRef.current = new Lenis(props);
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
