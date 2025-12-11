module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2.5rem",
        md: "1.2rem",
        xl: "2.5rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      grey1: "#323232",
      grey2: "#505050",
      grey3: "#828282",
      grey4: "#BEBEBE",
      grey5: "#DCDCDC",
      grey6: "#F0F0F0",
      messagingRed: "#ff5a5a",

      baseColor: "var(--color-primary)",
      lightColor: "var(--color-light)",
      darkColor: "var(--color-dark)",
      lighterColor: "var(--color-lighter)",
      darkerColor: "var(--color-darker)",
    },
    extend: {
      content: {
        externalLink: 'url("../assets/externalLink.svg")',
        phone: 'url("../assets/phone.svg")',
        mail: 'url("../assets/mail.svg")',
      },
      spacing: {
        7.5: "1.875rem",
        26: "6.5rem",
        30: "7.5rem",
        56: "14.5rem",
      },
      letterSpacing: {
        1: "0.01rem",
        8: "0.06rem", // 0.96px
        12: "0.008571428571428572em",
        14: "0.01em",
        16: "0.011428571428571429em",
      },
      transitionProperty: {
        width: "width",
      },
      margin: {
        25: "6.25rem",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/4": "3 / 4",
        "8/5": "8 / 5",
        "7/6": "7 / 6",
        "6/7": "6 / 7",
      },
      fontFamily: {
        primary: ["var(--font-family-primary)"],
        secondary: ["var(--font-family-secondary)"],
        inter: ["Inter", "ui-sans-serif", "system-ui", "-apple-system"],
        openSans: [
          '"Open Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
        ],
      },

      fontSize: {
        paragraph: ["0.875rem", "1.25rem"], // 14px 20px
        "large-paragraph": ["1rem", "1.5rem"], // 16px 24px
        "small-paragraph": ["0.75rem", "1.125rem"], //12px 18px
        "tiny-paragraph": ["0.75rem", "1rem"],
        btn: ["0.75rem", "1.25rem"],
        "small-caption": ["0.625rem", "1.25rem"],
        "medium-regular": ["1rem", "1.25rem"], // 16px 20px
        "small-regular": ["0.75rem", "1.25rem"], // 12px 20px
        "large-regular": ["1.125rem", "1.5rem"], // 18px 24px
        t4: ["1.5rem", "2rem"], // 24px 32px
        mt4: ["1.125rem", "1.625rem"], // 18px 26px
        /* TODO set values */

        "button-default": ["0.75rem", "1.25rem"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
