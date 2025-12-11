import { default as NextLink } from "next/link";
import PropTypes from "prop-types";
import { convertAbsoluteLinkToRelative } from "utils";

const Link = ({ link, children, ariaLabel, ...props }) => {
  const fixedLink = convertAbsoluteLinkToRelative(link);

  return link ? (
    <NextLink
      href={fixedLink?.href || ""}
      target={fixedLink?.target}
      aria-label={
        fixedLink?.target === "_blank" ? ariaLabel || link?.text : null
      }
      {...props}
    >
      {children || link?.text}
    </NextLink>
  ) : null;
};

Link.propTypes = {
  link: PropTypes.object,
};

export default Link;
