import { Column, flexRender } from '@tanstack/react-table';

import {
  Button, IconButton,
  Menu, Popover, useResponsiveContext,
} from '@/components';

type ToggleColumnsControlProps<T extends Record<string, unknown>> = {
  columns: Array<Column<T>>;
  label?: string;
}

export const ToggleColumnsControl = <T extends Record<string, unknown>>({
  columns,
  label = 'Toggle columns',
}: ToggleColumnsControlProps<T>) => {
  const { matches } = useResponsiveContext();

  return (
    <Popover>
      <Popover.Trigger>
        {matches.medium
          ? <Button kind="secondary" dimension="big">{label}</Button>
          : <IconButton icon="view" kind="secondary" dimension="big" />}
      </Popover.Trigger>
      <Popover.Content side="bottom" align="start">
        <Menu>
          {columns.filter(column => column.getCanHide()).map((column, i) => (
            <Menu.ItemCheckbox
              key={column.id}
              value={column.id}
              autoFocus={i === 0}
              checked={column.getIsVisible()}
              icon={column.getIsVisible() ? 'check' : undefined}
              onClick={column.getToggleVisibilityHandler()}
            >
              {flexRender<any>(column.columnDef.header, {})}
            </Menu.ItemCheckbox>
          ))}
        </Menu>
      </Popover.Content>
    </Popover>
  );
};

