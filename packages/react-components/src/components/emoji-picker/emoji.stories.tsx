import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { Emoji } from './emoji';

const meta = {
  title: 'Widgets/Emoji',
  component: Emoji,
  args: {
    size: 56,
    unified: '1f346',
  },
} satisfies Meta<typeof Emoji>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
