import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../";
import data from "./__mockData__.json";
import navConfig from "./Header.config";

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const HeaderWithNav: Story = {
  args: {
    data,
    ...navConfig,
  },
};
