export interface FooterProps {
  data: any;
  moduleAnims?: {
    background: Record<string, any>;
    module: Record<string, any>;
    logo: Record<string, any>;
    topWrapper: Record<string, any>;
    bottomWrapper: Record<string, any>;
    topLinks: {
      wrapper: Record<string, any>;
      item: Record<string, any>;
    };
    bottomLinks: {
      wrapper: Record<string, any>;
      item: Record<string, any>;
    };
    disclaimer: Record<string, any>;
    socialLinks: {
      wrapper: Record<string, any>;
      item: Record<string, any>;
    };
    copyright: Record<string, any>;
  };
  logoImageSizes?: string;
  backgroundImageSizes?: string;
  socialIcons?: Record<string, any>;
  backgroundPriority?: false;
  logoPriority?: false;
  textStyles?: {
    copyright?: Record<string, any>;
    topLinks?: Record<string, any>;
    bottomLinks?: Record<string, any>;
    socialLinks?: Record<string, any>;
    disclaimer?: Record<string, string>;
  };
  variant?: string;
}

export interface FooterTopLinksProps {
  data: any;
  motion?: {
    wrapper: Record<string, any>;
    item: Record<string, any>;
  };
  textStyle?: Record<string, any>;
}

export interface FooterBottomLinksProps {
  data: any;
  motion?: {
    wrapper: Record<string, any>;
    item: Record<string, any>;
  };
  textStyle?: Record<string, any>;
}

export interface FooterSocialLinksProps {
  data: any;
  icons?: Record<string, any>;
  motion?: {
    wrapper: Record<string, any>;
    item: Record<string, any>;
  };
}

export type FooterLink = {
  text: string;
  href: string;
  linkType?: string;
  target?: string;
};

export type SocialLink = {
  socialPlatform: string;
  link: FooterLink;
};
