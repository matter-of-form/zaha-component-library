import {
  createElement,
  createContext,
  forwardRef,
  Ref,
  useContext,
  useImperativeHandle,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import { BoxProps } from "./Box.types";
import { boxVars } from "./Box.styles";
import { motion, useMotionValue } from "framer-motion";
import { containsMotionProps } from "../../../utils";

const ScrollTriggerContext = createContext({} as any);
const scrollTriggerDefaults = {
  start: "top bottom",
  end: "bottom top",
  toggleActions: "restart none none none",
};

export const Box = forwardRef(
  (
    {
      className,
      variant = "flex",
      scrollTrigger,
      debug = false,
      onEnter,
      onEnterBack,
      onLeave,
      onLeaveBack,
      onRefresh,
      animateOnScrollDown,
      ...props
    }: BoxProps,
    ref: Ref<any>,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);
    const [motionState, setMotionState] = useState<string | undefined>();
    const [gsapRegistered, setGsapRegistered] = useState(false);
    const [inView, setInView] = useState(false);
    const [scrollState, setScrollState] = useState<string | undefined>();

    const isAnimated = containsMotionProps(props); //contains framer motion props?
    const allProps = {
      ...props,
      ...boxVars(variant, className, props.style),
      ...(motionState ? { animate: motionState } : {}),
    };

    // scrolltrigger
    const refTimeline = useRef<any>(null);
    const gsapRef = useRef<any>(null);
    const progress = useMotionValue(0);
    const velocity = useMotionValue(0);

    useEffect(() => {
      if (!(scrollTrigger || animateOnScrollDown)) return;
      let mounted = true;
      // gsap is only needed for scroll-triggered animations, so load it lazily
      // to keep it out of the bundle for the (common) non-animated Box instances.
      Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
        ([gsapModule, { ScrollTrigger }]) => {
          if (!mounted) return;
          const gsap = gsapModule.default;
          gsap.registerPlugin(ScrollTrigger);
          gsapRef.current = gsap;
          setGsapRegistered(true);
        },
      );
      return () => {
        mounted = false;
      };
    }, []);

    useLayoutEffect(() => {
      const gsap = gsapRef.current;
      if (innerRef.current && gsapRegistered && gsap) {
        refTimeline.current = gsap.timeline({
          scrollTrigger: {
            ...scrollTriggerDefaults,
            ...(scrollTrigger || {}),
            markers: debug,
            trigger: innerRef.current,
            onUpdate: (instance) => {
              progress.set(clamp(instance.progress, 0, 1));
              velocity.set(instance.getVelocity());
            },
            onEnter: () => {
              if (onEnter || animateOnScrollDown) {
                setMotionState(animateOnScrollDown ? "active" : onEnter);
              }
              setScrollState("enter");
            },
            onEnterBack: () => {
              if (onEnterBack || animateOnScrollDown) {
                setMotionState(animateOnScrollDown ? "active" : onEnterBack);
              }
              setScrollState("enterBack");
            },
            onLeave: () => {
              if (onLeave || animateOnScrollDown) {
                setMotionState(animateOnScrollDown ? "active" : onLeave);
              }
              setScrollState("leave");
            },
            onLeaveBack: () => {
              if (onLeaveBack || animateOnScrollDown) {
                setMotionState(animateOnScrollDown ? "inactive" : onLeaveBack);
              }
              setScrollState("leaveBack");
            },
            onRefresh: () => {
              if (onRefresh) {
                setMotionState(onRefresh);
              }
              setScrollState("refresh");
            },
            onToggle: (self) => {
              setInView(self.isActive);
            },
          },
        });
      }

      return () => {
        // Kill and clear the timeline and scrolltrigger instance when updated/unmounted.
        refTimeline.current?.scrollTrigger?.kill();
        refTimeline.current?.kill();
        refTimeline.current?.clear();
      };
    }, [
      debug,
      scrollTrigger,
      progress,
      velocity,
      innerRef.current,
      gsapRegistered,
    ]);

    const tagType: any = ["section", "footer", "header"].includes(`${variant}`)
      ? variant
      : "div";

    return createElement(
      isAnimated ? getMotionTag(tagType) : tagType, // if motion props exist on component, make this component animatable, otherwise render static div
      { ...allProps, ref: innerRef },
      <ScrollTriggerContext.Provider
        value={{ inView, motionState, progress, scrollState }}
      >
        {props.children}
      </ScrollTriggerContext.Provider>,
    );
  },
);

Box.displayName = "Box";

const getMotionTag = (tag: any) => {
  const tags: any = {
    div: motion.div,
    section: motion.section,
    footer: motion.footer,
    header: motion.header,
    span: motion.span,
  };

  return tags[tag] || motion.p;
};

export const useScrollTrigger = () => useContext(ScrollTriggerContext);

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);
