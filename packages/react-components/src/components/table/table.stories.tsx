import { ComponentMeta, ComponentStory } from '@storybook/react';

import { createColumnHelper, Table } from '.';
import { tableDataFixture } from './__fixture__/table-data';
import { TableProps } from './table';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  balance: string;
  status: string;
}

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    header: () => 'First Name',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    header: () => 'Last name',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('balance', {
    header: () => 'Balance',
    cell: info => <code>{info.renderValue()}</code>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
];

const story: ComponentMeta<typeof Table> = {
  title: 'Layouts/Table',
  component: Table,
};

export default story;

// @ts-expect-error Problem with generinc from the table
const Template: ComponentStory<typeof Table> = (args: TableProps<Person>) => (
  <Table {...args} columns={columns} data={tableDataFixture} />
);

export const Default = Template.bind({});

export const WithPagination = Template.bind({});
WithPagination.args = {
  showPagination: true,
};

export const WithToggleColumns = Template.bind({});
WithToggleColumns.args = {
  showHeader: true,
  enableToggleColumns: true,
};

export const WithFilter = Template.bind({});
WithFilter.args = {
  showHeader: true,
  selectableRows: true,
  enableFilterControl: true,
  filterFn: (row, columnId, value) => String(row.getValue(columnId)).toLowerCase().includes(value.toLowerCase()),
};

export const WithRowSelection = Template.bind({});
WithRowSelection.args = {
  enableToggleColumns: true,
  selectableRows: true,
  showPagination: true,
};

export const Scrollable = Template.bind({});
Scrollable.args = {
  selectableRows: true,
  showPagination: true,
  title: 'Scrollable table',
  background: 'var(--global-background)',
  height: '400px',
};

