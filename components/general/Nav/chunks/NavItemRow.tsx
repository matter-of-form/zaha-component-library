import { FC, useCallback, useContext } from "react";
import { Button } from "../../../../components";
import { useRouter } from "next/navigation";
import { NavContext } from "./";
import { navItem } from "../Nav.styles";
import { NavInteractionType } from "../Nav.types";

const NavItemRow: FC<any> = ({
  data,
  itemIndex,
  updatePanels,
  panelNum,
  offset,
  isActive,
}) => {
  const {
    navState,
    setNavState,
    navSettings,
    navItemAnimations,
    setImgProps,
    setIsOpen,
  } = useContext(NavContext);
  const { navItemText, navItemLink, navItems, navStyle, level, colour, image } =
    data;
  const {
    attachTo: attach,
    persistOn,
    motion,
    icon,
    textStyle,
  } = navSettings[panelNum + offset];
  const router = useRouter();
  const hasChildren = navItems && navItems.length > 0;

  const handleInteraction = useCallback(
    (event: MouseEvent, interaction: NavInteractionType) => {
      if (hasChildren) {
        if (interaction === "hover" && persistOn === "hover") {
          updatePanels({
            items: data.navItems,
            back: navItemText,
            activeIndex: itemIndex,
          });
        } else if (interaction === "hoverOut" && persistOn === "hover") {
          updatePanels({
            activeIndex: -1,
          });
        }

        if (interaction === "click" && persistOn !== "hover") {
          event.preventDefault();
          updatePanels({
            items: data.navItems,
            back: navItemText,
            activeIndex: itemIndex,
          });
        }
      } else if (interaction === "click") {
        navItemLink && router.push(navItemLink.href);
        setIsOpen(false);
      }
    },
    [navState, setNavState, data, router, persistOn],
  );

  const handleHover = useCallback(() => {
    setImgProps({ level, image, imageAvail: data.image });
  }, []);

  // if icons exist and/or set to show/hide on links/all
  let iconPre = icon?.iconPre?.icon;
  let iconPost = icon?.iconPost?.icon;

  if (icon?.iconPre?.onlyButtons && !hasChildren) {
    iconPre = undefined;
  }

  if (icon?.iconPost?.onlyButtons && !hasChildren) {
    iconPost = undefined;
  }

  return (
    <Button
      text={navItemText}
      onClick={(e: any) => handleInteraction(e, "click")}
      onMouseOver={handleHover}
      onMouseEnter={(e: any) => handleInteraction(e, "hover")}
      onMouseLeave={(e: any) => handleInteraction(e, "hoverOut")}
      variant="nav"
      iconPre={iconPre}
      iconPost={iconPost}
      {...navItem(
        isActive,
        icon,
        navStyle,
        data?.index,
        navItemAnimations,
        hasChildren,
        data?.colourCode,
      )}
      textStyle={textStyle?.textStyle}
      {...motion?.item}
      // {...props}
    />
  );
};

export default NavItemRow;
