import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import BrandingKeywords from '../pages/BrandingKeywords/BrandingKeywords';

const meta: Meta<typeof BrandingKeywords> = {
  title: 'pages/BrandingKeywords',
  component: BrandingKeywords,
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

type Story = StoryObj<typeof BrandingKeywords>;

export const Default: Story = {}; 