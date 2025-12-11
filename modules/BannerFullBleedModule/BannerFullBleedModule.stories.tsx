import type { Meta, StoryObj } from "@storybook/react";
import { BannerFullBleedModule } from "../";

const data: any = {
  tag: "Section Title",
  headingTitle: {
    heading: "<p>Banner Full Bleed</p>",
    htag: "h2",
  },
  description:
    "<p>Description goes here lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec vestibulum eros. Curabitur ac libero malesuada, feugiat ligula quis, sodales diam.</p>",
  // Image for test
  image: {
    imageUrl:
      "https://zhweb-qa-f-app.azurewebsites.net/media/wotgyell/adrian-cuj-o_9ymcy0bag-unsplash.jpg",
    title: "",
    description: "",
    imageAlt: "",
    mediaId: 1229,
    isSvg: false,
    isVideo: false,
  },
  // The real data could contain video and looks like this:
  /*
  backgroundMedia: {
    coverImage: {
      imageUrl: "/media/wjynwnvn/arturo-castaneyra-o-dkysvidb4-unsplash.jpg",
      title: "Duis aute irure dolor in reprehenderit in voluptate velit 45",
      description: "",
      imageAlt: "",
      mediaId: 1252,
      isSvg: false,
      isVideo: false
    },
    videoFromGallery: null,
    vimeoId: "865912138",
    youtubeId: "",
    autoPlay: true,
    loop: true,
    allowFullScreen: false
  },
  */
  primaryCta: {
    text: "Play",
    href: "www.google.com",
  },
  anchor: "",
  anchorDisplayName: "",
  paddingTop: "",
  paddingBottom: "",
};

const meta: Meta<typeof BannerFullBleedModule> = {
  component: BannerFullBleedModule,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BannerFullBleedModule>;

export const BannerFullBleed: Story = {
  args: {
    data,
  },
};
