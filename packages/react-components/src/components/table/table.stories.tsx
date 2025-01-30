import type { Meta, StoryObj } from '@storybook/react';
import { useMemo } from 'react';

import {
  IconButton, Menu, Popover, ResponsiveProvider, Stack,
} from '../..';
import { createColumnHelper, Table, TableProps } from '.';
import { tableDataFixture } from './__fixture__/table-data';

type Person = {
  actions?: unknown;
  firstName: string;
  lastName: string;
  age: number;
  balance: string;
  status: string;
}

const columnHelper = createColumnHelper<Person>();

const story: Meta<TableProps<Person>> = {
  title: 'Layouts/Table',
  component: Table,
  args: {
    itemsPerPage: 10,
  },
  decorators: [
    Story => (
      <ResponsiveProvider>
        <Story />
      </ResponsiveProvider>
    ),
  ],
  render: function Render({ ...args }) {
    const columns = useMemo(() => [
      columnHelper.accessor('actions', {
        header: ' ',
        enableSorting: false,
        enableHiding: false,
        meta: {
          collapsed: true,
        },
        cell: () => (
          <Stack direction="row" columnGap={8} fill={false}>
            <IconButton icon="settings-gear" kind="secondary" />
            <Popover>
              <Popover.Trigger><IconButton icon="dot-menu" kind="secondary" /></Popover.Trigger>
              <Popover.Content side="bottom" align="start" offset={4}>
                <Popover.Close>
                  <Menu>
                    <Menu.Item
                      value="watching"
                      autoFocus
                      icon="alarm-disabled"
                    >
                      Watch
                    </Menu.Item>
                    <Menu.Item
                      value="status"
                      icon="on"
                    >
                      Enable
                    </Menu.Item>
                  </Menu>
                </Popover.Close>
              </Popover.Content>
            </Popover>
          </Stack>
        ),
      }),
      columnHelper.accessor('firstName', {
        header: () => 'First Name',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        size: 400,
        minSize: 300,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        footer: info => info.column.id,
        enableSorting: false,
      }),
    ], []);

    return (<Table {...args} columns={columns} data={tableDataFixture} />);
  },
};

export default story;
type Story = StoryObj<typeof Table>;

export const Default: Story = {};

export const WithPagination = {
  args: {
    showPagination: true,
  },
};

export const WithToggleColumns: Story = {
  args: {
    showHeader: true,
    enableToggleColumns: true,
  },
};

export const WithFilter: Story = {
  args: {
    showHeader: true,
    selectableRows: true,
    enableFilterControl: true,
    filterFn: (row, columnId, value: string) =>
      String(row.getValue(columnId)).toLowerCase().includes(value.toLowerCase()),
  },
};

export const WithFilterDefaultValue: Story = {
  args: {
    showHeader: true,
    selectableRows: true,
    enableFilterControl: true,
    filterFn: (row, columnId, value: string) =>
      String(row.getValue(columnId)).toLowerCase().includes(value.toLowerCase()),
    filterControlDefaultValue: 'John',
    onFilterTextChange: (value: string) => console.log(value),
  },
};

export const WithRowSelection: Story = {
  args: {
    enableToggleColumns: true,
    selectableRows: true,
    showPagination: true,
  },
};

export const WithDefaultColumnVisibility: Story = {
  args: {
    enableToggleColumns: true,
    showHeader: true,
    defaultColumnVisibility: {
      status: false,
    },
  },
};

export const Scrollable: Story = {
  args: {
    selectableRows: true,
    showPagination: true,
    title: 'Scrollable table',
    background: 'var(--global-background)',
    height: '400px',
  },
};
