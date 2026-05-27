import {
  forwardRef,
  Ref,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { divider, navVars } from "./Nav.styles";
import { NavProps } from "./Nav.types";
import { NavContext, NavItem, NavWrapperRow } from "./chunks";
import { useDimensions } from "../../../hooks";
import { Box, Stack } from "../../../components";
import { remapNavData, extractAllOfType, setupNav } from "../../../utils";
import SearchButton from "./chunks/SearchButton";

export const Nav: NavProps = forwardRef(
  (
    {
      className,
      variant = "primary",
      data,
      usePhotographerAsCredit = false,
      defaultImage,
      itemsPerColumn,
      isActive = false,
      headerAction = null,
      setHeaderAction = () => {},
      navProps,
      onBreakpointChange,
      hideSearchButton = false,
      scrollContainer,
      enableDesktopScrollLock = false,
      ...props
    }: NavProps,
    ref: Ref<NavProps>,
  ) => {
    const navRef = useRef(null);
    const [navState, setNavState] = useState(remapNavData(data));
    const [activeItemIndex, setActiveItemIndex] = useState(-1);
    const [currTier, setCurrTier] = useState(0);
    const [panelWidth, setPanelWidth] = useState(0);
    const [navSettings, setNavSettings] = useState(null);
    const [imgProps, setImgProps] = useState({ level: 0, image: null });
    const { breakpoint, width: navWidth, screenWidth } = useDimensions(navRef);

    const handleCollapseSiblings = (index: number) => {
      setActiveItemIndex(index);
    };

    useImperativeHandle(ref, () => navRef.current as any);

    useLayoutEffect(() => {
      const newBreakpoint = breakpoint === "base" ? "sm" : breakpoint;

      const navSettings = setupNav(navProps, navState, newBreakpoint);
      onBreakpointChange && onBreakpointChange(newBreakpoint);

      if (navSettings) {
        setNavSettings(navSettings);
      }
    }, [breakpoint]);

    if (!navState || navState.length <= 0 || !navSettings) return null;

    const images = extractAllOfType(navState, "image");

    const renderBasic = navState.map((val: any, i: number) => {
      return (
        <NavItem
          key={`mainNav${i}`}
          data={val}
          itemIndex={i}
          isActive={activeItemIndex === i}
          collapseSiblings={() => handleCollapseSiblings(i)}
        />
      );
    });

    const baseLevelSettings: any = navSettings?.[0];

    let renderItems = renderBasic;
    if (
      baseLevelSettings.attachTo === "slide" ||
      baseLevelSettings.attachTo === "stackRow"
    ) {
      renderItems = (
        <NavWrapperRow
          data={navState}
          isOpen={headerAction === "navigation"}
          navSettings={navSettings}
          offset={breakpoint === "lg" ? 1 : 0}
        />
      );
    }

    const menuWidth = navWidth === 0 ? screenWidth - 16 : navWidth;

    return (
      <Stack
        ref={navRef}
        {...navVars(
          variant,
          baseLevelSettings.persistOn,
          headerAction === "navigation",
          className,
        )}
        direction={baseLevelSettings.direction}
        {...props}
      >
        <NavContext.Provider
          value={{
            itemsPerColumn,
            navState,
            setNavState,
            enableDesktopScrollLock,
            images,
            imgProps,
            setImgProps,
            setCurrTier,
            currTier,
            menuWidth,
            headerAction,
            setHeaderAction,
            variant,
            navSettings,
            setPanelWidth,
            panelWidth,
            scrollContainer,
            defaultImage,
            usePhotographerAsCredit,
          }}
        >
          {renderItems}
          {!hideSearchButton && (
            <SearchButton setSearchOpen={setHeaderAction} />
          )}
        </NavContext.Provider>
      </Stack>
    );
  },
);

Nav.displayName = "Nav";
