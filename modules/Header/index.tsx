import { FC, useEffect, useRef, useState } from "react";
import { Box, Media, Nav, Stack, SearchDrawer } from "../../components";
import {
  headerWrapper,
  headerContent,
  headerLogo,
  navClose,
  navOpen,
  navToggleButtons,
} from "./Header.styles";
import { useRouter } from "next/navigation";
import SearchButton from "../../components/general/Nav/chunks/SearchButton";

const Header: FC<any> = ({
  data,
  navProps,
  moduleAnims,
  variant,
  icons,
  scrollContainer,
  enableDesktopScrollLock = false,
  ...props
}) => {
  const router = useRouter();
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const [headerAction, setHeaderAction] = useState<
    "navigation" | "search" | null
  >(null);
  const [currBreakpoint, setCurrBreakpoint] = useState("base");

  useEffect(() => {
    window.addEventListener("click", closeIfClickedOutside);
    return () => {
      window.removeEventListener("click", closeIfClickedOutside);
    };
  }, []);

  useEffect(() => {
    const scrollCont = scrollContainer || window?.document?.documentElement;
    if (scrollCont) {
      scrollCont.style.overflow =
        headerAction === "navigation" ? "hidden" : "unset";
      scrollCont.style.touchAction =
        headerAction === "navigation" ? "none" : "auto";
    }
  }, [headerAction]);

  const closeIfClickedOutside = (e: MouseEvent) => {
    const nav: any = navRef.current;
    const toggle: any = toggleRef.current;

    console.log(e.target);

    if (!nav || !toggle) return;

    if (
      !nav.contains(e.target) &&
      !toggle.contains(e.target) &&
      // @ts-ignore
      !Array.from(e?.target?.classList).some(
        (className: string) =>
          className?.includes("nav") ||
          className?.includes("search-input") ||
          className?.includes("button-search"),
      )
    ) {
      setHeaderAction(null);
    }
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const toggleNav = () => {
    if (headerAction === "navigation") {
      setHeaderAction(null);
    } else {
      setHeaderAction("navigation");
    }
  };

  const handleBreakpointChange = (breakpoint: string) => {
    setCurrBreakpoint(breakpoint);
  };

  const showHideMotion =
    currBreakpoint === "sm" || currBreakpoint === "md"
      ? moduleAnims?.wrapper(headerAction === "navigation")
      : {};

  const LogoComponent = () => {
    let loadedLogo = (
      <Media
        data={data.logo}
        onClick={handleLogoClick}
        {...headerLogo}
        {...moduleAnims?.logo}
      />
    );
    if (icons?.logo) {
      loadedLogo = (
        <Box onClick={handleLogoClick} {...headerLogo} {...moduleAnims?.logo}>
          {icons?.logo}
        </Box>
      );
    }
    return loadedLogo;
  };

  return (
    <Box
      variant="header"
      {...headerWrapper(
        props,
        headerAction === "navigation",
        headerAction === "search",
      )}
      {...moduleAnims?.module}
    >
      <Stack {...headerContent} {...moduleAnims?.header}>
        <LogoComponent />
        {/* @ts-ignore */}
        <Nav
          ref={navRef}
          data={data?.mainNavItems}
          defaultImage={data?.defaultImage}
          variant={variant}
          navProps={navProps}
          onBreakpointChange={handleBreakpointChange}
          headerAction={headerAction}
          setHeaderAction={setHeaderAction}
          scrollContainer={scrollContainer}
          enableDesktopScrollLock={enableDesktopScrollLock}
          {...showHideMotion}
        />

        <Box
          ref={toggleRef}
          {...navToggleButtons(
            headerAction === "navigation",
            moduleAnims?.toggleWrapper,
          )}
        >
          <SearchButton setSearchOpen={setHeaderAction} />
          <Box {...navOpen(moduleAnims?.toggleOpen)} onClick={toggleNav}>
            {icons?.navOpen}
          </Box>
        </Box>

        {headerAction !== null && (
          <Box {...navClose(moduleAnims?.toggleClose)}>{icons?.navClose}</Box>
        )}

        <SearchDrawer searchOpen={headerAction === "search"} />
      </Stack>
    </Box>
  );
};

export default Header;
