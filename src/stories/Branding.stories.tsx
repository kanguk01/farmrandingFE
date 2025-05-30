import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Branding from '../pages/Branding/Branding';

const meta: Meta<typeof Branding> = {
  title: 'pages/Branding',
  component: Branding,
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

type Story = StoryObj<typeof Branding>;

export const Default: Story = {}; 