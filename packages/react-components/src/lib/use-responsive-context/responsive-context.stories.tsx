import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ResponsiveProvider, useResponsiveContext } from '../..';

const story: ComponentMeta<typeof ResponsiveProvider> = {
  title: 'Utils/ResponsiveContext',
  component: ResponsiveProvider,
  argTypes: {
  },
};

export default story;

const ModalShell: ComponentStory<typeof ResponsiveProvider> = () => {
  const { matches } = useResponsiveContext();

  return <pre style={{ whiteSpace: 'pre' }}>{JSON.stringify(matches, null, 2)}</pre>;
};

const DefaultTemplate: ComponentStory<typeof ResponsiveProvider> = () => (
  <ResponsiveProvider>
    <ModalShell />
  </ResponsiveProvider>
);

export const Matches = DefaultTemplate.bind({});
