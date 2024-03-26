import React, { useState, useEffect, useRef } from "react";
import { Button, Stack } from "../../../components";
import { popoverContent, popoverWrapper } from "./Popover.styles";

let exitTimeout = null;

const Popover = ({ title, placement, icons, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapper = useRef();

  useEffect(() => {
    window.addEventListener("click", closeIfClickedOutside);
    return () => {
      window.removeEventListener("click", closeIfClickedOutside);
    };
  }, []);

  const closeIfClickedOutside = (e) => {
    if (!wrapper.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const toggleOpen = (e) => {
    setIsOpen(!isOpen);
  };

  const handleEnter = () => {
    clearTimeout(exitTimeout);
  };

  const handleLeave = () => {
    exitTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  return (
    <Stack
      ref={wrapper}
      direction="column"
      {...popoverWrapper(placement, isOpen)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Button
        text={title}
        variant="popover"
        iconPost={icons?.dropdown}
        onClick={toggleOpen}
      />
      <Stack {...popoverContent}>{children}</Stack>
    </Stack>
  );
};

export default Popover;
