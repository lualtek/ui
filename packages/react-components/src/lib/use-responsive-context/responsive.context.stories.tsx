import { ComponentStory, Meta } from '@storybook/react';

import { ResponseContextProvider, useResponsiveContext } from '../..';

const story: Meta = {
  title: 'Utils/ResponsiveContext',
  component: ResponseContextProvider,
  argTypes: {
  },
};

export default story;

const ModalShell: ComponentStory<typeof ResponseContextProvider> = () => {
  const { matches } = useResponsiveContext();

  return <pre style={{ whiteSpace: 'pre' }}>{JSON.stringify(matches, null, 2)}</pre>;
};

const DefaultTemplate: ComponentStory<typeof ResponseContextProvider> = () => (
  <ResponseContextProvider>
    <ModalShell />
  </ResponseContextProvider>
);

export const Matches = DefaultTemplate.bind({});
