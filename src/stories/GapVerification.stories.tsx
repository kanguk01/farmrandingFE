import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import GapVerification from '../pages/GapVerification/GapVerification';

const meta: Meta<typeof GapVerification> = {
  title: 'pages/GapVerification',
  component: GapVerification,
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

type Story = StoryObj<typeof GapVerification>;

export const Default: Story = {}; 