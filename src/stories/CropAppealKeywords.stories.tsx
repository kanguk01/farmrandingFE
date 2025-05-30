import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import CropAppealKeywords from '../pages/CropAppealKeywords/CropAppealKeywords';

const meta: Meta<typeof CropAppealKeywords> = {
  title: 'pages/CropAppealKeywords',
  component: CropAppealKeywords,
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

type Story = StoryObj<typeof CropAppealKeywords>;

export const Default: Story = {}; 