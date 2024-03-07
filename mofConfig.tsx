import Arrow from "./assets/icons/arrow.svg";
import Close from "./assets/icons/close.svg";
// MOF component library presets and overrides

export default {
  button: {
    primary: {},
    secondary: {},
    primaryCircle: {},
    secondaryCircle: {},
    primaryOutline: {},
    secondaryOutline: {},
    primaryWithIcon: {
      icons: {
        iconPost: <Arrow />,
      },
    },
    primaryOnlyIcon: {
      icons: {
        iconPost: <Close />,
      },
      omitText: true,
    },
    videoPlay: {
      icons: {
        iconPost: <Arrow />,
      },
      text: "PLAY",
    },
    linkWithIcon: {
      icons: {
        iconPost: <Arrow />,
      },
    },
    iconBack: {
      icons: {
        iconPost: <Arrow />,
      },
      omitText: true,
    },
    iconNext: {
      icons: {
        iconPost: <Arrow />,
      },
      omitText: true,
    },
    paginate: {
      textStyle: "i-sm",
    },
  },
  contentProps: {
    heroLeftAligned: {
      textStyles: {
        tag: {
          textStyle: "p",
        },
        headingTitle: {
          textStyle: "h1",
        },
      },
    },
    articleHero: {
      textStyles: {
        tag: {
          textStyle: "p",
        },
        headingTitle: {
          textStyle: "h5",
        },
        description: {
          textStyle: "p-sm",
        },
      },
      buttons: {
        primaryCta: {
          variant: "primary",
        },
        secondaryCta: {
          variant: "secondary",
        },
      },
    },
    bannerFullBleed: {
      textStyles: {
        tag: {
          textStyle: "p",
        },
        headingTitle: {
          textStyle: "h1",
          variant: "primary",
        },
        description: {
          textStyle: "p-sm",
        },
      },
      buttons: {
        primaryCta: {
          variant: "primaryCircle",
        },
      },
    },
    focus: {
      textStyles: {
        tag: {
          textStyle: "p",
        },
        preHeading: {
          textStyle: "p",
        },
        infoTags: {
          textStyle: "p-sm",
        },
        headingTitle: {
          textStyle: "h5",
        },
        description: {
          textStyle: "p-sm",
        },
      },
      buttons: {
        primaryCta: {
          variant: "primary",
        },
      },
    },
    generic: {
      textStyles: {
        tag: {
          variant: "primary",
          textStyle: "p-xxs",
        },
        headingTitle: {
          textStyle: "h5",
        },
        subHeading: {
          variant: "primaryBold",
          textStyle: "h3",
        },
        info: {
          variant: "primaryBold",
          textStyle: "p-xs",
        },
        description: {
          variant: "primary",
          textStyle: "p-xs",
        },
      },
    },
    primary: {
      textStyles: {
        preHeading: {
          variant: "primaryBold",
          textStyle: "p",
        },
        headingTitle: {
          textStyle: "h5",
        },
        subHeading: {
          variant: "primaryBold",
          textStyle: "h3",
        },
        info: {
          variant: "primaryBold",
          textStyle: "p",
        },
      },
      buttons: {
        primaryCta: {
          variant: "primary",
        },
      },
    },
    headingSide: {
      textStyles: {
        tag: {
          textStyle: "p-sm",
        },
        headingTitle: {
          textStyle: "h1",
        },
        description: {
          textStyle: "p",
        },
      },
    },
  },
  text: {
    variant: {
      alternate: "font-alternate",
      alternateBold: "font-alternate text-bold",
      alternateLight: "font-alternate text-light",
      alternateItalic: "font-alternate text-italic",
    },
    textStyle: {
      quote: "text-quote",
    },
  },
};
