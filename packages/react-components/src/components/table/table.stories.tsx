import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useCallback, useState } from 'react';

import {
  Button, IconButton, Popover, Stack, Title,
} from '../..';
import { Table } from './table';

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
    data: [
      {
        firstName: 'Gianni',
        lastName: 'Morandi',
        address: 'Via Roma, 1, Treno',
        uid: 3456789542556789,
        info: 123123.12,
        subRows: [
          {
            firstName: 'ciao',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: 123123,
            info: 12,
            subRows: [
              {
                firstName: '1',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: 123123,
                info: 12,
                subRows: [
                  {
                    firstName: '1',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: 123123,
                    info: 12,
                    subRows: [
                      {
                        firstName: '1',
                        lastName: 'Stuffo',
                        address: 'Via Roma, 15 Monza',
                        uid: 123123,
                        info: 12,
                        subRows: [
                          {
                            firstName: '1',
                            lastName: 'Stuffo',
                            address: 'Via Roma, 15 Monza',
                            uid: 123123,
                            info: 12,
                            subRows: [
                              {
                                firstName: '1',
                                lastName: 'Stuffo',
                                address: 'Via Roma, 15 Monza',
                                uid: 123123,
                                info: 12,
                                subRows: [
                                  {
                                    firstName: '1',
                                    lastName: 'Stuffo',
                                    address: 'Via Roma, 15 Monza',
                                    uid: 123123,
                                    info: 12,
                                    subRows: [
                                      {
                                        firstName: '1',
                                        lastName: 'Stuffo',
                                        address: 'Via Roma, 15 Monza',
                                        uid: 123123,
                                        info: 12,
                                        subRows: [
                                          {
                                            firstName: '1',
                                            lastName: 'Stuffo',
                                            address: 'Via Roma, 15 Monza',
                                            uid: 123123,
                                            info: 12,
                                          },
                                          {
                                            firstName: '2',
                                            lastName: 'Stuffo',
                                            address: 'Via Roma, 15 Monza',
                                            uid: 123123,
                                            info: 12,
                                          },
                                          {
                                            firstName: '3',
                                            lastName: 'Stuffo',
                                            address: 'Via Roma, 15 Monza',
                                            uid: 123123,
                                            info: 12,
                                          },
                                        ],
                                      },
                                      {
                                        firstName: '2',
                                        lastName: 'Stuffo',
                                        address: 'Via Roma, 15 Monza',
                                        uid: 123123,
                                        info: 12,
                                      },
                                      {
                                        firstName: '3',
                                        lastName: 'Stuffo',
                                        address: 'Via Roma, 15 Monza',
                                        uid: 123123,
                                        info: 12,
                                      },
                                    ],
                                  },
                                  {
                                    firstName: '2',
                                    lastName: 'Stuffo',
                                    address: 'Via Roma, 15 Monza',
                                    uid: 123123,
                                    info: 12,
                                  },
                                  {
                                    firstName: '3',
                                    lastName: 'Stuffo',
                                    address: 'Via Roma, 15 Monza',
                                    uid: 123123,
                                    info: 12,
                                  },
                                ],
                              },
                              {
                                firstName: '2',
                                lastName: 'Stuffo',
                                address: 'Via Roma, 15 Monza',
                                uid: 123123,
                                info: 12,
                              },
                              {
                                firstName: '3',
                                lastName: 'Stuffo',
                                address: 'Via Roma, 15 Monza',
                                uid: 123123,
                                info: 12,
                              },
                            ],
                          },
                          {
                            firstName: '2',
                            lastName: 'Stuffo',
                            address: 'Via Roma, 15 Monza',
                            uid: 123123,
                            info: 12,
                          },
                          {
                            firstName: '3',
                            lastName: 'Stuffo',
                            address: 'Via Roma, 15 Monza',
                            uid: 123123,
                            info: 12,
                          },
                        ],
                      },
                      {
                        firstName: '2',
                        lastName: 'Stuffo',
                        address: 'Via Roma, 15 Monza',
                        uid: 123123,
                        info: 12,
                      },
                      {
                        firstName: '3',
                        lastName: 'Stuffo',
                        address: 'Via Roma, 15 Monza',
                        uid: 123123,
                        info: 12,
                      },
                    ],
                  },
                  {
                    firstName: '2',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: 123123,
                    info: 12,
                  },
                  {
                    firstName: '3',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: 123123,
                    info: 12,
                  },
                ],
              },
              {
                firstName: '2',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: 123123,
                info: 12,
              },
              {
                firstName: '3',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: 123123,
                info: 12,
              },
            ],
          },
        ],
      },
      {
        firstName: 'Simone',
        lastName: 'Lastname',
        address: 'Via Roma, 12, Bologna',
        uid: '345367890',
        canBeDeleted: true,
        info: 123.96,
      },
      {
        firstName: 'Matteo',
        lastName: 'Staffone',
        address: 'Via Roma, 13, Genova',
        uid: 23456789,
        info: <code>23456789</code>,
        subRows: [
          {
            firstName: '1',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: 123123,
            info: 12,
          },
          {
            firstName: '2',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: 123123,
            info: 12,
            subRows: [
              {
                firstName: '1',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: 123123,
                info: 12,
                subRows: [
                  {
                    firstName: '1',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: 123123,
                    info: 12,
                  },
                  {
                    firstName: '2',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: 123123,
                    info: 12,
                  },
                  {
                    firstName: '3',
                    lastName: 'Stuffo',
                    address: 'Via Roma, 15 Monza',
                    uid: 123123,
                    info: 12,
                  },
                ],
              },
              {
                firstName: '2',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: 123123,
                info: 12,
              },
              {
                firstName: '3',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: 123123,
                info: 12,
              },
            ],
          },
          {
            firstName: '3',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: 123123,
            info: 12,
            subRows: [
              {
                firstName: '1',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: 123123,
                info: 12,
              },
              {
                firstName: '2',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: 123123,
                info: 12,
              },
              {
                firstName: '3',
                lastName: 'Stuffo',
                address: 'Via Roma, 15 Monza',
                uid: 123123,
                info: 12,
              },
            ],
          },
        ],
      },
      {
        firstName: 'Emanuele',
        lastName: 'Staffo',
        address: 'Via Roma, 14, Milano',
        uid: '2345678',
        info: 1234,
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: 123123,
        info: 12,
        subRows: [
          {
            firstName: 'ciao',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: 123123,
            info: 12,
          },
        ],
      },
      {
        firstName: 'Luca',
        lastName: 'Morandi',
        address: 'Via Roma, 1, Treno',
        uid: 3456795423556789,
        info: 123123.12,
        subRows: [
          {
            firstName: 'ciao',
            lastName: 'Stuffo',
            address: 'Via Roma, 15 Monza',
            uid: 123123,
            info: 12,
          },
        ],
      },
      {
        firstName: 'Mattia',
        lastName: 'Lastname',
        address: 'Via Roma, 12, Bologna',
        uid: 345367890,
        info: 123.96,
      },
      {
        firstName: 'Morfeo',
        lastName: 'Staffone',
        address: 'Via Roma, 13, Genova',
        uid: 3434235,
        info: 12.1213,
      },
      {
        firstName: 'Gianluca',
        lastName: 'Staffo',
        address: 'Via Roma, 14, Milano',
        uid: 2345678,
        info: 1234,
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: 123123,
        info: 12,
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: 123123,
        info: 12,
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: 123123,
        info: 12,
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: 123123,
        info: 12,
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: 123123,
        info: 12,
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: 123123,
        info: 12,
      },
      {
        firstName: 'Simone',
        lastName: 'Stuffo',
        address: 'Via Roma, 15 Monza',
        uid: 123123,
        info: 12,
      },
    ],
  },
};

export default story;

const CustomExpandableComponent = ({ data }) => (
  <Stack hPadding={16} vPadding={16}>
    {Object.keys(data).map((item, i) => (
      <div key={item} style={{ background: 'var(--dimmed-1)', padding: 24, minHeight: 50 * (i + 1) }}>
        <Title level="6">{typeof data[item] === 'string' ? data[item] : null}</Title>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, nostrum minima, debitis qui magni voluptatum.
      </div>
    ))}
  </Stack>
);

const CustomEmptyComponent = () => (
  <div>
    It seems there is no data to show inside this table. If data should be present,please
    check if columns are visible by using the table controls.
  </div>
);

const Template: ComponentStory<typeof Table> = args => (
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
  selectedActions: <Button>Delete</Button>,
  onSelectionChange: (selectedRows, selectedIds) => {
    console.log({ selectedRows, selectedIds });
  },
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
  showPagination: true,
};

export const RowActions = Template.bind({});
RowActions.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  actionsRowComponent: ({ depth }) => (
    <Stack direction="row" fill={false}>
      <IconButton icon="ctrl-right" kind="flat" dimension="small" />
      {depth > 0 && (
      <Popover trigger={<IconButton icon="increase" kind="flat" dimension="small" />}>
        <div>Pop</div>
      </Popover>
      )}
    </Stack>
  ),
};

export const NoData = Template.bind({});
NoData.args = {
  columnsControl: true,
  showHeader: true,
  selectableRows: true,
  data: [],
};

const ManualPaginationTemplate: ComponentStory<typeof Table> = ({ data, ...args }) => {
  const [pageData, setPageData] = useState([]);
  const [totalRows, setTotalRows] = useState(1);

  const fetchData = useCallback(({ pageIndex, pageSize }) => {
    setTotalRows(data.length);
    setPageData(data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize));
  }, [data]);

  return (
    <Table
      {...args}
      data={pageData}
      onDataUpdate={fetchData}
      totalRows={totalRows}
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

const ManualSortingTemplate: ComponentStory<typeof Table> = ({ data, ...args }) => {
  const [pageData, setPageData] = useState([]);
  const [totalRows, setTotalRows] = useState(1);
  const [sortBy, setSortBy] = useState([]);

  const fetchData = useCallback(({ pageIndex, pageSize }) => {
    setTotalRows(data.length);

    const result = [...data];
    console.log(sortBy[0]);
    if (sortBy[0]) {
      result.sort((a, b) => {
        if (typeof b[sortBy[0].id] === 'number' || typeof a[sortBy[0].id] === 'number') {
          if (sortBy[0].desc) {
            return b[sortBy[0].id] - a[sortBy[0].id];
          }
          return a[sortBy[0].id] - b[sortBy[0].id];
        }
        if (sortBy[0].desc) {
          return b[sortBy[0].id].localeCompare(a[sortBy[0].id]);
        }
        return a[sortBy[0].id].localeCompare(b[sortBy[0].id]);
      });
    }

    setPageData(result.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize));
  }, [data, sortBy]);

  return (
    <Table
      {...args}
      data={pageData}
      onSortChange={sortBy => setSortBy(sortBy)}
      onDataUpdate={fetchData}
      totalRows={totalRows}
      emptyComponent={<CustomEmptyComponent />}
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
