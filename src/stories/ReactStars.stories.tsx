import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ReactStars } from '..';

export default {
  title: 'ReactStars',
  component: ReactStars,
  argTypes: {},
} as Meta<typeof ReactStars>;

const Template: StoryFn<typeof ReactStars> = (args) => <ReactStars {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  size: 30,
  value: 2.5,
  edit: false,
};

export const CustomIcon = Template.bind({});

CustomIcon.args = {
  size: 50,
  count: 10,
  char: '',
  onChange: (newValue: any) => {
    console.log(`Example 2: new value is ${newValue}`);
  },
};

export const WithoutHalf = Template.bind({});

WithoutHalf.args = {
  size: 40,
  count: 7,
  isHalf: true,
  value: 4,
  onChange: (newValue: any) => {
    console.log(`Example 3: new value is ${newValue}`);
  },
};
