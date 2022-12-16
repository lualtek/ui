// import { useCallback, useMemo } from 'react';

import { Button, Menu, Popover } from '@/components';

import { CustomColumnInstanceType } from '../types';

type ToggleColumnsControlProps<T extends Record<string, unknown>> = {
  columns: Array<CustomColumnInstanceType<T>>;
  label?: string;
}

export const ToggleColumnsControl = <T extends Record<string, unknown>>({
  columns,
  label = 'Toggle columns',
}: ToggleColumnsControlProps<T>) => (
  <Popover>
    <Popover.Trigger><Button kind="secondary" dimension="big">{label}</Button></Popover.Trigger>
    <Popover.Content side="bottom" align="start">
      <Menu>
        {columns.filter(col => !col.isToggable).map((column, i) => (
          <Menu.ItemCheckbox
            value={column.id}
            autoFocus={i === 0}
            key={column.id}
            checked={column.isVisible}
            icon={column.isVisible ? 'check' : undefined}
            onClick={() => column.toggleHidden()}
          >
            {column.render('Header')}
          </Menu.ItemCheckbox>
        ))}
      </Menu>
    </Popover.Content>
  </Popover>
  );

