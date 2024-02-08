import type { Meta, StoryObj } from '@storybook/react';
import Component from '.';

const data: any = {
  headingTitle: {
    heading: "<p>Projects</p>",
    htag: '',
  },
  image: {
    imageUrl:
      'https://qa-cms.zaha-hadid.com/media/wotgyell/adrian-cuj-o_9ymcy0bag-unsplash.jpg',
    title: '',
    description: '',
    imageAlt: '',
    mediaId: 1229,
    isSvg: false,
    isVideo: false,
  },
  tag: "13 typologies"
};

// TODO: 
// Handle data from BE
// Display infoTags array

/* The real data From BE
  "backgroundMedia": {
    "imageUrl": "/media/nm4aowig/zha_1.jpg",
    "title": "",
    "description": "",
    "imageAlt": "",
    "mediaId": 1201,
    "isSvg": false,
    "isVideo": false
  },
  "infoTags": [
    "13 typologies",
    "60+ ongoing projects",
    "200+ awards"
  ]
*/

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const HeroLeftAlignedModule: Story = {
  args: {
    data,
  },
};
