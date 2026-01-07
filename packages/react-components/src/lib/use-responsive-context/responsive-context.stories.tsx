import type { Meta, StoryObj } from '@storybook/react-vite';

import { ResponsiveProvider, useResponsiveContext } from '../..';

const meta = {
  title: 'Utils/ResponsiveContext',
  component: ResponsiveProvider,
  argTypes: {
  },
} satisfies Meta<typeof ResponsiveProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const CustomComponent = () => {
  const { matches } = useResponsiveContext();
  return <pre style={{ whiteSpace: 'pre' }}>{JSON.stringify(matches, null, 2)}</pre>;
};

export const Matches = {
  render: () => (
    <ResponsiveProvider>
      <CustomComponent />
    </ResponsiveProvider>
  ),
} satisfies Story;
