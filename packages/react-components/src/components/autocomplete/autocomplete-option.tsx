'use client';

import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import type { Except } from 'type-fest';

import type { MenuItemProps } from '@/components';
import { ClampText, Menu } from '@/components';

export type AutocompleteOptionProps = Except<MenuItemProps, 'padding' | 'autoFocus' | 'onClick'> &
  Except<React.ComponentPropsWithRef<'button'>, 'onClick'> & {
    /**
     * Callback called when the option is clicked.
     * It passes the value and the inner text of the option as arguments.
     */
    onClick?: (value: string | number, content?: string) => void;
    /**
     * Label of the option. This is the text that will be displayed in the option, which can be
     * different from the value.
     */
    children: string | string[];
  };

export const AutocompleteOption: FC<AutocompleteOptionProps> = ({
  children,
  value,
  onClick,
  ref: forwardedRef,
  ...otherProps
}) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const handleClick = useCallback(() => {
    onClick?.(value, contentRef?.current?.innerText);
  }, [onClick, value]);

  return (
    <Menu.Item value={value} ref={forwardedRef} padding={false} onClick={handleClick} {...otherProps}>
      <span ref={contentRef}>
        <ClampText rows={1}>{children}</ClampText>
      </span>
    </Menu.Item>
  );
};
