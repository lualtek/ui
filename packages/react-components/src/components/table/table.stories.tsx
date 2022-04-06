import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useCallback, useMemo, useState } from 'react';

import {
  Button, IconButton, Menu, Popover, Separator, Stack, Title,
} from '../..';
import { tableData, tableDataWithIds, tableFirstData } from './__fixtures__/table-data';
import { Table } from './table';
import { CustomSortingRule } from './types';

const firstData = tableFirstData;
const dataWithIds = tableDataWithIds;

const story: ComponentMeta<typeof Table> = {
  title: 'Layouts/Table',
  parameters: {
    centered: { disable: true },
  },
  args: {
    stripes: false,
    selectableRows: false,
    showSeparators: true,
    showHeader: false,
    columns: [
      {
        id: 'firstName',
        Header: 'First Name',
        accessor: row => row.firstName,
      },
      {
        id: 'lastName',
        Header: 'Last Name',
        accessor: row => row.lastName,
      },
      {
        id: 'address',
        Header: 'Address',
        accessor: row => row.address,
      },
      {
        id: 'uid',
        Header: 'UID',
        accessor: row => row.uid,
        minWidth: 200,
        align: 'end',
      },
      {
        id: 'info',
        Header: 'Info',
        accessor: row => row.info,
        disableSortBy: true,
        align: 'end',
        minWidth: 180,
      },
    ],
    data: tableData,
  },
};

export default story;

const CustomExpandableComponent = ({ data }: { data: any }) => (
  <Stack
    vPadding={16}
    hPadding={16}
    rowGap={32}
  >
    {Object.keys(data).map((item, i) => (
      <div key={item} style={{ background: 'var(--dimmed-1)', padding: 24, minHeight: 50 * (i + 1) }}>
        <Title level="6">{typeof data[item] === 'string' ? data[item] : null}</Title>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, nostrum minima, debitis qui magni voluptatum.
      </div>
    ))}
  </Stack>
);

const CustomEmptyComponent = () => (
  <div title="No data to show">
    It seems there is no data to show inside this table. If data should be present,please
    check if columns are visible by using the table controls.
  </div>
);

const Template: ComponentStory<typeof Table> = ({ ...args }) => (
  <Table
    emptyComponent={<CustomEmptyComponent />}
    {...args}
  />
);

export const Simple = Template.bind({});

export const SelectedRows = Template.bind({});
SelectedRows.args = {
  title: 'With selectable rows',
  selectableRows: true,
};

export const HidingColumn = Template.bind({});
HidingColumn.args = {
  showHeader: true,
  columnsControl: true,
};

export const defaultHiddenColumns = Template.bind({});
defaultHiddenColumns.args = {
  showHeader: true,
  columnsControl: true,
  defaultHiddenColumns: ['address', 'uid'],
};

export const Scrollable = Template.bind({});
Scrollable.args = {
  columnsControl: true,
  showHeader: true,
  background: 'var(--global-background)',
  title: 'Scrollable table',
  height: '400px',
};

export const WithTableActions = Template.bind({});
WithTableActions.args = {
  columnsControl: true,
  title: 'Custom title element',
  showHeader: true,
  actions: <Button>Custom action</Button>,
};

export const CustomExpandable = Template.bind({});
CustomExpandable.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  expandableRowComponent: data => <CustomExpandableComponent data={data} />,
};

export const Pagination = Template.bind({});
Pagination.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  itemsPerPage: 3,
  pageClusters: [3, 6, 9, 12],
  showPagination: true,
};

const RowActionsTemplate: ComponentStory<typeof Table> = ({
  columns,
  ...args
}) => {
  const tableColumns = useMemo(() => [
    {
      id: 'actions',
      disableSortBy: true,
      isToggable: true,
      isCollapsed: true,
      accessor: _row => (
        <Stack direction="row" fill={false}>
          <IconButton icon="view" kind="flat" dimension="small" />
          <Popover>
            <Popover.Trigger><IconButton icon="chat" kind="flat" dimension="small" /></Popover.Trigger>
            <Popover.Content side="bottom" align="start" offset={4}>
              <Menu>
                <Menu.Item
                  dimension="small"
                  autoFocus
                  icon="ctrl-right"
                >
                  Sample long menu item
                </Menu.Item>
                <Menu.Item
                  dimension="small"
                  icon="sun"
                >
                  Short menu label
                </Menu.Item>
                <Separator />
                <Menu.Item dimension="small" icon="view">Even shorter</Menu.Item>
                <Menu.Item dimension="small" disabled>Really?</Menu.Item>
              </Menu>
            </Popover.Content>
          </Popover>
        </Stack>
      ),
    },
    ...columns], [columns]);
  return (
    <Table
      columns={tableColumns}
      {...args}
    />
  );
};

export const RowActions = RowActionsTemplate.bind({});
RowActions.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
};

export const NoData = Template.bind({});
NoData.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  data: [],
};

const ManualPaginationTemplate: ComponentStory<typeof Table> = ({ ...args }) => {
  const [pageData, setPageData] = useState(dataWithIds.slice(0, 5));

  const fetchData = useCallback(({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    const newIndexStart = pageIndex * pageSize;
    const newIndexEnd = (pageIndex * pageSize) + pageSize;
    setPageData((dataWithIds).slice(newIndexStart, newIndexEnd));
  }, []);

  return (
    <Table
      {...args}
      data={pageData}
      onPaginationChange={fetchData}
      totalRows={dataWithIds.length}
      emptyComponent={<CustomEmptyComponent />}
    />
  );
};

export const ManualPagination = ManualPaginationTemplate.bind({});
ManualPagination.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  showPagination: true,
  itemsPerPage: 5,
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  columnsControl: true,
  showHeader: true,
  loading: true,
};

const ManualSortingTemplate: ComponentStory<typeof Table> = ({
  data,
  ...args
}) => {
  const [pageData, setPageData] = useState(dataWithIds.slice(0, 5));
  const [sortBy, setSortBy] = useState<Array<CustomSortingRule<typeof firstData>>>([]);

  const fetchData = useCallback(({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    const result = [...dataWithIds];

    if (sortBy.length === 0) {
      setPageData(result.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize));
      return;
    }

    const sorting = sortBy[0];

    result.sort((dataA, dataB) => {
      const isTypeNumber = typeof dataB[sorting.id] === 'number' || typeof dataA[sorting.id] === 'number';
      if (isTypeNumber) {
        const numberA = Number(dataA[sorting.id]);
        const numberB = Number(dataB[sorting.id]);
        return sorting.desc ? numberB - numberA : numberA - numberB;
      }

      const stringA = String(dataA[sorting.id]);
      const stringB = String(dataB[sorting.id]);

      return sorting.desc
        ? stringB.localeCompare(stringA)
        : stringA.localeCompare(stringB);
    });

    setPageData(result.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize));
  }, [sortBy]);

  return (
    <Table
      data={pageData}
      onSortChange={sortBy => setSortBy(sortBy)}
      onPaginationChange={fetchData}
      totalRows={dataWithIds.length}
      emptyComponent={<CustomEmptyComponent />}
      {...args}
    />
  );
};

export const ManualSorting = ManualSortingTemplate.bind({});
ManualSorting.args = {
  isManualSorted: true,
  columnsControl: true,
  selectableRows: true,
  showPagination: true,
  itemsPerPage: 5,
};
