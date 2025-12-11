import { useEffect, useRef } from "react";
import classNames from "classnames";
import { gsap } from "gsap/dist/gsap";
import tailwindConfig from "../../tailwind.config.js";

const FadeUpAnimation = ({ className, ...props }) => {
  const boxRef = useRef();
  const tl = useRef();

  useEffect(() => {
    gsap
      .matchMedia()
      .add(`(min-width: ${tailwindConfig.theme.screens.lg})`, () => {
        if (tl.current) {
          tl.current.kill();
        }
        tl.current = gsap.timeline();

        gsap.fromTo(
          boxRef.current,
          {
            y: 100,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: boxRef.current,
              start: "top bottom",
              toggleActions: "play pause resume reverse",
            },

            y: 0,
            opacity: 1,
          },
        );

        return () => tl.current?.kill();
      });
  }, []);

  return (
    <div ref={boxRef} className={classNames("", className)}>
      <div {...props} />
    </div>
  );
};

export default FadeUpAnimation;
