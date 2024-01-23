import type { Preview } from "@storybook/react";
import "../theme/styles/globals.css";
import "../existing/styles/generated.css"; 

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
