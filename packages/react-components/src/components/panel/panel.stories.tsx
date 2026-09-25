import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { BlankButton, Button, IconButton, Sheet, Stack, Text, Title } from '..';
import { Panel } from './panel';

const meta = {
  title: 'Layouts/Panel',
  component: Panel,
  args: {
    radius: 24,
    bordered: false,
    hPadding: undefined,
    vPadding: undefined,
  },
  argTypes: {
    vibrancyLevel: {
      options: [undefined, 'soft', 'strong'],
      control: { type: 'radio' },
    },
    vibrancySaturation: {
      options: [undefined, 'standard', 'high'],
      control: { type: 'radio' },
    },
    vibrancyColor: {
      options: [undefined, 'background', 'soft', 'mid', 'hard', 'red', 'yellow', 'green', 'brand'],
      control: { type: 'select' },
    },
    borderSide: {
      options: ['all', 'top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
  },
  render: (args) => <Panel {...args}>Ciao</Panel>,
} satisfies Meta<typeof Panel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithVibrancy = {
  args: {
    vibrant: true,
    vibrancyColor: 'mid',
  },
  render: (args) => (
    <>
      <img
        width="100%"
        style={{ position: 'absolute', zIndex: -1 }}
        alt=""
        src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80"
      />
      <Panel {...args}>Ciao</Panel>
    </>
  ),
} satisfies Story;

export const Bordered = {
  args: {
    bordered: true,
    borderSide: 'all',
  },
} satisfies Story;

export const Dimmed = {
  args: {
    backgroundColor: 2,
  },
} satisfies Story;

export const CustomColor = {
  args: {
    backgroundColor: 'red',
  },
} satisfies Story;

export const WithHover = {
  args: {
    bordered: true,
    backgroundColor: 2,
    backgroundColorHover: 1,
  },
  render: () => (
    <Panel backgroundColor={2} backgroundColorHover={3} bordered as={BlankButton} vPadding={24} hPadding={24}>
      Ciao
    </Panel>
  ),
} satisfies Story;

const DevicePanel = () => {
  const titleId = useId();
  return (
    <Panel bordered radius={24} hPadding={24} vPadding={24} backgroundColorHover={1}>
      <Panel.Link href="#device" aria-labelledby={titleId} />
      <Stack rowGap={16} fill={false}>
        <Title id={titleId} level="5">
          Water meter
        </Title>
        <Stack direction="row" columnGap={8} vAlign="center" fill={false}>
          <Text>Today: 66.01 m³</Text>
          <Sheet
            heading="Consumption calculation"
            trigger={<Panel.Action as={IconButton} icon="c-info" aria-label="How consumption is calculated" />}
          >
            <Stack rowGap={24} fill={false}>
              <Text>95.02 − 29.01 = 66.01 m³</Text>
              <Sheet.Close asChild>
                <Button>Close</Button>
              </Sheet.Close>
            </Stack>
          </Sheet>
        </Stack>
      </Stack>
    </Panel>
  );
};

export const WithIndependentAction = {
  render: () => <DevicePanel />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: 'Water meter' });
    const action = canvas.getByRole('button', { name: 'How consumption is calculated' });
    await expect(link).toHaveAttribute('href', '#device');
    await expect(action.closest('a')).toBeNull();
    await userEvent.click(action);
    const body = within(canvasElement.ownerDocument.body);
    await expect(await body.findByRole('dialog')).toBeVisible();
    await expect(body.getByText('95.02 − 29.01 = 66.01 m³')).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: /^Close$/ }));
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(action).toHaveFocus();
  },
} satisfies Story;
export const WithLink = {
  args: { bordered: true, hPadding: 24, vPadding: 24 },
  render: (args) => (
    <Panel {...args}>
      <Panel.Link href="#device" aria-label="Temperature sensor" />
      <Title level="5">Temperature sensor</Title>
      <Text>24 °C</Text>
    </Panel>
  ),
} satisfies Story;
