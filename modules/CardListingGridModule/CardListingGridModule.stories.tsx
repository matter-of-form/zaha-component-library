import type { Meta, StoryObj } from "@storybook/react";
import { CardListingGridModule } from "../";
import dataTeam from "./__mockdata__.json";
import dataExpertise from "./__mockDataExpertise__.json";
import dataProducts from "./__mockDataProducts__.json";
import dataEvents from "./__mockDataEvents__ .json";
import moduleConfig from "./CardListingGridModule.config";

declare const window: {
  innerWidth: number;
  addEventListener: any;
  removeEventListener: any;
};

const meta: Meta<typeof CardListingGridModule> = {
  component: CardListingGridModule,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardListingGridModule>;

export const CardListingGridTeam: Story = {
  args: {
    data: dataTeam,
    paginationType: "showMore",
    ...moduleConfig,
  },
};

export const CardListingGridExpertise: Story = {
  args: {
    data: dataExpertise,
    ...moduleConfig,
  },
};

export const CardListingGridProducts: Story = {
  args: {
    data: dataProducts,
    ...moduleConfig,
  },
};

export const CardListingGridEvents: Story = {
  args: {
    data: dataEvents,
    ...moduleConfig,
  },
};
