import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../..';
import { Tabs } from './tabs';

const story: ComponentMeta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  args: {
    defaultValue: '1',
  },
};
export default story;

const Template: ComponentStory<typeof Tabs> = args => (
  <Tabs {...args}>
    <Tabs.Panel value="1" label="Tab 1">Panel 1</Tabs.Panel>
    <Tabs.Panel value="2" label="Tab mid long 2">Panel 2</Tabs.Panel>
    <Tabs.Panel value="3" label="Tab short 3">Panel 3</Tabs.Panel>
    <Tabs.Panel value="4" label="Tab veryy long 4">Panel 4</Tabs.Panel>
    <Tabs.Panel value="5" label="Tab 5">Panel 5</Tabs.Panel>
    <Tabs.Panel value="6" label="Tab 6">Panel 6</Tabs.Panel>
  </Tabs>
);

export const Default = Template.bind({});

export const InitialTab = Template.bind({});
InitialTab.args = {
  defaultValue: '3',
};

// export const ProgrammaticTab = () => {
//   const state = useState(0);
//   const [, setState] = state;

//   return (
//     <Tabs state={state}>
//       <Tabs.Panel label="Tab 1"><button type="button" onClick={() => setState(4)}>Go to 5</button></Tabs.Panel>
//       <Tabs.Panel label="Tab 2">Panel 2</Tabs.Panel>
//       <Tabs.Panel label="Tab 3">Panel 3</Tabs.Panel>
//       <Tabs.Panel label="Tab 4">Panel 4</Tabs.Panel>
//       <Tabs.Panel label="Tab 5">Panel 5</Tabs.Panel>
//       <Tabs.Panel label="Tab 6">Panel 6</Tabs.Panel>
//       <Tabs.Panel label="Tab 7">Panel 7</Tabs.Panel>
//     </Tabs>
//   );
// };

// export const ChangeEvent = Template.bind({});

// ChangeEvent.args = {
//   onChange: current => alert(`current is ${current}`),
// };

// export const IconsTab = () => {
//   const state = useState(0);

//   return (
//     <Tabs state={state}>
//       <Tabs.Panel icon="sun" label="Tab 1">Panel 1</Tabs.Panel>
//       <Tabs.Panel icon="star" label="Tab 2">Panel 2</Tabs.Panel>
//       <Tabs.Panel icon="moon-stars" label="Tab 3">Panel 3</Tabs.Panel>
//       <Tabs.Panel icon="view" label="Tab 4">Panel 4</Tabs.Panel>
//     </Tabs>
//   );
// };

export const ConditionalTab = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Tabs defaultValue="1">
      <Tabs.Panel value="1" label="Tab 1">
        Tab panel 1
      </Tabs.Panel>
      <Tabs.Panel value="2" label="Tab 2">
        <Button icon="sun" onClick={() => setIsVisible(!isVisible)}>Toggle new tab</Button>
      </Tabs.Panel>
      {isVisible && <Tabs.Panel value="3" label="Tab 3">Tab panel 3</Tabs.Panel>}
    </Tabs>
  );
};

export const DisabledTabs: ComponentStory<typeof Tabs> = args => (
  <Tabs defaultValue="1" {...args}>
    <Tabs.Panel value="1" label="Tab 1">Panel 1</Tabs.Panel>
    <Tabs.Panel value="2" label="Tab mid long 2">Panel 2</Tabs.Panel>
    <Tabs.Panel value="3" label="Tab short 3">Panel 3</Tabs.Panel>
    <Tabs.Panel disabled value="4" label="Tab veryy long 4">Panel 4</Tabs.Panel>
    <Tabs.Panel value="5" label="Tab 5">Panel 5</Tabs.Panel>
    <Tabs.Panel value="6" label="Tab 6">Panel 6</Tabs.Panel>
  </Tabs>
);

export const WithIcons: ComponentStory<typeof Tabs> = args => (
  <Tabs defaultValue="1" {...args}>
    <Tabs.Panel icon="star" value="1" label="Tab 1">Panel 1</Tabs.Panel>
    <Tabs.Panel icon="view" value="2" label="Tab mid long 2">Panel 2</Tabs.Panel>
    <Tabs.Panel icon="sun" value="3" label="Tab short 3">Panel 3</Tabs.Panel>
    <Tabs.Panel icon="moon-stars" disabled value="4" label="Tab veryy long 4">Panel 4</Tabs.Panel>
    <Tabs.Panel icon="zoom" value="5" label="Tab 5">Panel 5</Tabs.Panel>
    <Tabs.Panel icon="check" value="6" label="Tab 6">Panel 6</Tabs.Panel>
  </Tabs>
);
