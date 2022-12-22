import { ComponentMeta, ComponentStory } from '@storybook/react';

import { createColumnHelper, TableNew as Table } from '.';
import { tableDataFixture } from './__fixture__/table-data';

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
    cell: info => info.getValue(),
    header: () => 'First Name',
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: info => info.renderValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('balance', {
    header: () => <span>Balance</span>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: info => info.column.id,
  }),
];

const story: ComponentMeta<typeof Table> = {
  title: 'Layouts/New Table',
  component: Table,
};

export default story;

const Template: ComponentStory<typeof Table> = args => (<Table {...args} columns={columns} data={tableDataFixture} />);

export const Default = Template.bind({});

export const WithPagination = Template.bind({});
WithPagination.args = {
  showPagination: true,
};

export const WithToggleColumns = Template.bind({});
WithToggleColumns.args = {
  showHeader: true,
  columnsControl: true,
};
