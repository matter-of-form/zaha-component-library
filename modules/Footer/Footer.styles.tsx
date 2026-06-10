import { TextProps } from "../../components";
import classnames from "classnames";

export const topWrapper = (motion?: any) => ({
  className: classnames(["footer-top-wrapper"]),
  ...motion,
});

export const logoWrapper = (motion?: any) => ({
  className: classnames(["footer-logo"]),
  ...motion,
});

export const topLinks = (motion?: any) => ({
  className: classnames(["footer-top-links"]),
  ...motion,
});

export const topLinkItem = (
  motion?: any,
  textStyle?: Record<string, any>,
  linkType?: string,
) => ({
  className: classnames(["footer-top-links-item"], {
    external: linkType === "External",
  }),
  ...motion,
  ...textStyle,
});

export const disclaimer = (motion?: any, textStyle?: Record<string, any>) => ({
  className: classnames(["footer-disclaimer"]),
  ...motion,
  ...textStyle,
});

export const bottomWrapper = (motion?: any) => ({
  className: classnames(["footer-bottom-wrapper"]),
  ...motion,
});

export const bottomLinks = (motion?: any) => ({
  className: classnames(["footer-bottom-links"]),
  ...motion,
});

export const bottomLinkItem = (
  motion?: any,
  textStyle?: Record<string, any>,
  linkType?: string,
) => ({
  className: classnames(["footer-bottom-links-item"], {
    external: linkType === "External",
  }),
  ...motion,
  ...textStyle,
});

export const copyright = (motion?: any, textStyle?: Record<string, any>) => ({
  className: classnames(["footer-copyright"]),
  ...motion,
  ...textStyle,
});

export const socialLinks = (motion?: any) => ({
  className: classnames(["footer-social-links"]),
  ...motion,
});

export const socialLinkItem = (motion?: any) => ({
  className: classnames(["footer-social-links-item"]),
  ...motion,
});

export const backgroundHolder = (motion?: any) => ({
  className: classnames(["footer-background"]),
  ...motion,
});
