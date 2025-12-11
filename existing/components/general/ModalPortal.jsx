import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById("modal-portal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(<div>{children}</div>, ref.current)
    : null;
};

ModalPortal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalPortal;
