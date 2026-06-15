import { FC, useContext, useEffect, useRef, useState } from "react";
import { Button, Stack } from "../../../../components";
import { NavContext, NavItemRow } from "./";
import Scrollbars from "react-scrollbars-custom";
import {
  backButtonHeader,
  navPanelColumn,
  scrollbarsWrapper,
} from "../Nav.styles";
import { useDimensions } from "../../../../hooks";

const NavPanelColumn: FC<any> = ({
  currTier,
  data,
  panelNum,
  updatePanels,
  offset,
}) => {
  const columnWrapperRef = useRef<any>(null);
  const scrollWrapper = useRef<any>(null);
  const [isHeightTruncated, setIsHeightTruncated] = useState(false);
  const { menuWidth, navSettings, panelWidth, setPanelWidth } =
    useContext(NavContext);
  const { icon, attachTo, motion, scrollable } =
    navSettings[Math.min(panelNum + offset, navSettings.length - 1)] || {};
  const { items, back } = data;
  const { width } = useDimensions(columnWrapperRef);
  const {
    height: scrollHeight,
    y: scrollTop,
    screenHeight,
  } = useDimensions(scrollWrapper);

  useEffect(() => {
    if (panelNum === 0) {
      setPanelWidth(width);
    }
  }, [width, panelNum]);

  useEffect(() => {
    if (scrollTop && scrollHeight && screenHeight) {
      const availableHeight = screenHeight - scrollTop;
      setIsHeightTruncated(availableHeight < scrollHeight);
    }
  }, [scrollTop, scrollHeight, screenHeight]);

  if (!Array.isArray(items)) return null;

  let backButton;
  if (back && attachTo === "slide") {
    backButton = (
      <Button
        variant="nav"
        text={back}
        iconPre={icon?.iconBack?.icon}
        onClick={() => updatePanels({ activeIndex: -1 })}
        {...backButtonHeader}
      />
    );
  }

  const renderItems = items.map((val: any, i: number) => {
    return (
      <NavItemRow
        key={`mainNav${i}`}
        data={val}
        itemIndex={i}
        isActive={val.isActive}
        updatePanels={updatePanels}
        panelNum={panelNum}
        navSettings={navSettings}
        offset={offset}
      />
    );
  });

  let panelMotion = (motion && motion?.panel) || {};
  if (motion && motion?.panel && attachTo === "stackRow" && panelNum > 0) {
    let motionWidth = offset === 0 ? menuWidth : panelWidth;

    panelMotion = motion?.panel(currTier, motionWidth, offset);
  }

  const isScrollable = scrollable && isHeightTruncated;

  const itemRows = (
    <Stack direction="column" ref={scrollWrapper}>
      {renderItems}
    </Stack>
  );

  return (
    <Stack
      ref={columnWrapperRef}
      direction="column"
      {...navPanelColumn(menuWidth, attachTo, isScrollable)}
      {...panelMotion}
    >
      {backButton}
      {isScrollable ? (
        <Scrollbars {...scrollbarsWrapper(scrollHeight)}>{itemRows}</Scrollbars>
      ) : (
        itemRows
      )}
    </Stack>
  );
};

export default NavPanelColumn;
