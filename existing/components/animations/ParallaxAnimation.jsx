import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { gsap } from "gsap/dist/gsap";
import { useLayoutEffect } from "utils";
import tailwindConfig from "../../tailwind.config.js";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ParallaxAnimation = ({
  children,
  className,
  move = 100,
  zoom,
  ...props
}) => {
  const [imageAspect, setImageAspect] = useState(null);
  const [marginTop, setMarginTop] = useState(null);
  const [height, setHeight] = useState(null);
  const boxRef = useRef();
  const tl = useRef();

  useEffect(() => {
    gsap
      .matchMedia()
      .add(`(min-width: ${tailwindConfig.theme.screens.lg})`, () => {
        if (move !== null) {
          const section = boxRef.current.closest("section.module");
          if (tl.current) {
            tl.current.kill();
          }
          tl.current = gsap.timeline();

          if (zoom) {
            gsap.fromTo(
              boxRef.current,
              {
                scale: 1.2,
              },
              {
                scrollTrigger: {
                  trigger: boxRef.current,
                  start: "top+=30% bottom",
                  toggleActions: "play none none none",
                },

                duration: 2,
                scale: 1,
                ease: "Circ.easeOut",
              },
            );
          }

          tl.current.to(boxRef.current, {
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              scrub: true,
            },
            y: move,
            ease: "none",
          });

          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: () => {
              if (boxRef.current) {
                if (ScrollTrigger.isInViewport(boxRef.current)) {
                  tl.current.play();
                } else {
                  tl.current.pause();
                }
              }
            },
          });

          return () => tl.current.kill();
        }
      });
  }, [move, zoom]);

  useLayoutEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResize = () => {
    if (window.innerWidth >= parseInt(tailwindConfig.theme.screens.lg, 10)) {
      setImageAspect(boxRef.current.offsetWidth / boxRef.current.offsetHeight);
      setMarginTop(`-${move - imageAspect * 10}px`);
      setHeight(`calc(100% + ${move / 1.8}px)`);
    } else {
      setMarginTop(null);
      setHeight(null);
    }
  };

  return (
    <div
      className={classNames("overflow-hidden w-full h-full", className)}
      {...props}
    >
      <div
        className="w-full h-full relative will-change-transform"
        ref={boxRef}
      >
        <div
          className="w-full left-0 right-0 top-0 relative"
          style={{
            marginTop,
            height,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ParallaxAnimation;
