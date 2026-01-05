/*
 * Copyright © 2026 Lualtek Srl
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use
 * of this code, via any medium, is strictly prohibited.
 *
 * Developed by Mattia Astorino for Lualtek Srl
 * https://lualtek.io
 */

import { Column, flexRender } from '@tanstack/react-table';

import {
  Button, IconButton,
  Menu, Popover, useResponsiveContext,
} from '@/components';

type ToggleColumnsControlProps<T extends Record<string, unknown>> = {
  /**
   * The columns that can be toggled.
   */
  columns: Array<Column<T>>;
  /**
   * Set the label of the action button.
   *
   * @defaultValue "Toggle columns"
   */
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

