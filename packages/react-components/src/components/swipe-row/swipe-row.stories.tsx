import type { Meta, StoryObj } from '@storybook/react-vite';

import { BlankButton, Panel, SwipeRowActionProps } from '@/components';

import { SwipeRow } from './swipe-row';

const renderActions = (props: Omit<SwipeRowActionProps, 'icon' | 'label'>) => [
  <SwipeRow.Action
    {...props}
    icon="trash"
    label="Edit"
    onClick={() => console.log('Edit clicked')}
  />,
  <SwipeRow.Action
    {...props}
    sentiment="positive"
    icon="ai-chat"
    label="Action 2"
    onClick={() => console.log('Delete clicked')}
  />,
  <SwipeRow.Action
    {...props}
    sentiment="informative"
    icon="zoom"
    label="Action 3"
    onClick={() => console.log('Delete clicked')}
  />,
  <SwipeRow.Action
    {...props}
    sentiment="danger"
    icon="remove"
    label="My Action"
    onClick={() => console.log('Delete clicked')}
  />,
];

const meta: Meta<typeof SwipeRow> = {
  title: 'Actions/Swipe Row',
  component: SwipeRow,
  tags: ['mobile', 'code-only'],
  argTypes: {},
  args: {
    trigger: (
      <Panel vibrant radius={24} vibrancyColor="soft" hPadding={24} vPadding={24} bordered>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Python Scripts</p>
        <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#555' }}>Updated yesterday</p>
      </Panel>
    ),
    children: <>
      {renderActions({})}
    </>,
  },
} satisfies Meta<typeof SwipeRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithLabels = {
  args: {
    trigger: (
      <Panel vibrant radius={24} vibrancyColor="soft" hPadding={24} vPadding={24} bordered>
        <p style={{ margin: 0, fontWeight: 'bold' }}>Python Scripts</p>
        <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#555' }}>Updated yesterday</p>
      </Panel>
    ),
    children: <>
      {renderActions({
        showLabel: true,
      })}
    </>,
  },
} satisfies Story;


export const WithClickableTrigger = {
  args: {
    trigger: (
      <Panel
        as={BlankButton}
        onClick={() => console.log('Trigger clicked!')}
        vibrant
        radius={24} vibrancyColor="soft" hPadding={24} vPadding={24}
        bordered
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>Python Scripts</p>
      </Panel>
    ),
    children: <>
      {renderActions({
        showLabel: true,
      })}
    </>,
  },
} satisfies Story;

export const ActionSize = {
  args: {
    trigger: (
      <Panel
        as={BlankButton}
        onClick={() => console.log('Trigger clicked!')}
        vibrant
        radius={24} vibrancyColor="soft" hPadding={24} vPadding={24}
        bordered
      >
        <p style={{ margin: 0, fontWeight: 'bold' }}>Python Scripts</p>
      </Panel>
    ),
    children: <>
      {renderActions({
        showLabel: true,
        dimension: "small"
      })}
    </>,
  },
} satisfies Story;
