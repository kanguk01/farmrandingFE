import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import LogoImageKeywords from '../pages/LogoImageKeywords/LogoImageKeywords';

const meta: Meta<typeof LogoImageKeywords> = {
  title: 'pages/LogoImageKeywords',
  component: LogoImageKeywords,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LogoImageKeywords>;

export const Default: Story = {}; 