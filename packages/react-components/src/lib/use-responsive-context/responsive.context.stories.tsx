import { Meta, StoryFn } from '@storybook/react';

import { ResponsiveProvider, useResponsiveContext } from '../..';

const story: Meta = {
  title: 'Utils/ResponsiveContext',
  component: ResponsiveProvider,
  argTypes: {
  },
};

export default story;

const ModalShell: StoryFn<typeof ResponsiveProvider> = () => {
  const { matches } = useResponsiveContext();

  return <pre style={{ whiteSpace: 'pre' }}>{JSON.stringify(matches, null, 2)}</pre>;
};

const DefaultTemplate: StoryFn<typeof ResponsiveProvider> = () => (
  <ResponsiveProvider>
    <ModalShell />
  </ResponsiveProvider>
);

export const Matches = DefaultTemplate.bind({});
