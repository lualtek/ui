import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button, IconButton, Sheet, Stack, Text, Title } from '..';
import { LinkedPanel } from './linked-panel';

const meta = {
  title: 'Layouts/LinkedPanel',
  component: LinkedPanel,
  args: { bordered: true, radius: 24, hPadding: 24, vPadding: 24 },
} satisfies Meta<typeof LinkedPanel>;
export default meta;
type Story = StoryObj<typeof meta>;

const DevicePanel = () => {
  const titleId = useId();
  return (
    <LinkedPanel bordered radius={24} hPadding={24} vPadding={24} backgroundColorHover={1}>
      <LinkedPanel.Link href="#device" aria-labelledby={titleId} />
      <Stack rowGap={16} fill={false}>
        <Title id={titleId} level="5">
          Water meter
        </Title>
        <Stack direction="row" columnGap={8} vAlign="center" fill={false}>
          <Text>Today: 66.01 m³</Text>
          <Sheet
            heading="Consumption calculation"
            trigger={<LinkedPanel.Action as={IconButton} icon="c-info" aria-label="How consumption is calculated" />}
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
    </LinkedPanel>
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
export const WithoutActions = {
  render: (args) => (
    <LinkedPanel {...args}>
      <LinkedPanel.Link href="#device" aria-label="Temperature sensor" />
      <Title level="5">Temperature sensor</Title>
      <Text>24 °C</Text>
    </LinkedPanel>
  ),
} satisfies Story;
