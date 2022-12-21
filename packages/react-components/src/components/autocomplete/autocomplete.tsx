import clsx from 'clsx';
import {
  forwardRef, ForwardRefExoticComponent,
  ReactNode,
  useState,
} from 'react';
import { useDebouncedValue, useDimensionsRef } from 'rooks';

import {
  Menu,
  MenuProps, Popover, Textfield, TextfieldProps,
} from '@/components';

import styles from './autocomplete.module.css';
import { AutocompleteOption, AutocompleteOptionProps } from './autocomplete-option';

type ValueType = {
  query: string;
  value: string;
}

export type AutocompleteProps = TextfieldProps & {
  /**
   * The callback called when an option is picked from the list
   */
  onChange?: (value: ValueType) => void;
  /**
   * Set the maximum height of the options list after which
   * it will scroll.
   */
  maxHeight?: MenuProps['maxHeight'];
  /**
   * Custom empty content to display when there are no options or
   * when the value does not match any of the options.
   */
  emptyContent?: ReactNode;
  /**
   * Show skeletons while loading options.
   */
  loading?: boolean;
};

type AutocompleteComponent = ForwardRefExoticComponent<AutocompleteProps> & {
  Option: ForwardRefExoticComponent<AutocompleteOptionProps>;
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(({
  className,
  children,
  onChange,
  disabled,
  readOnly,
  value,
  loading,
  maxHeight = '200px',
  // emptyContent = 'No items to show',
  ...otherProps
}, forwardedRef) => {
  // const autocompleteRef = useRef<HTMLDivElement>(null);
  const [ref, dimensions] = useDimensionsRef();
  const [query] = useState(value ? String(value) : '');

  const [debouncedValue] = useDebouncedValue(
    query,
    100,
  );

  return (
    <div
      ref={ref}
      className={clsx(styles.Autocomplete, className)}
    >
      <Popover>
        <Popover.Trigger>
          <Textfield
            ref={forwardedRef}
            autoComplete="off"
            disabled={disabled}
            readOnly={readOnly}
            {...otherProps}
          />
        </Popover.Trigger>
        <Popover.Content onOpenAutoFocus={e => e.preventDefault()}>
          <Menu
            role="listbox"
            className={styles.OptionsList}
            style={{ width: dimensions ? (dimensions.width + 2) : 'auto' }}
            maxHeight={maxHeight}
          >
            {/**
             * EmptyState to show if no resulsts matching the search
             * {(filteredOptions.length === 0 && !loading)
             *  && <Text as="div" textAlign="center" dimmed={5}>{emptyContent}</Text>}
             */}
            {/*
            {loading
              ? <Stack hPadding={8} as="span"><Skeleton count={3} /></Stack>
              : Children.map(filteredOptions, child => isValidElement(child) && cloneElement(
                child as ReactElement<MenuItemProps>,
                {
                  // onClick: handleOptionClick,
                },
              ))
            } */}
            {debouncedValue}
            {children}
          </Menu>
        </Popover.Content>
      </Popover>
    </div>
  );
}) as AutocompleteComponent;

Autocomplete.Option = AutocompleteOption;
Autocomplete.displayName = 'Autocomplete';
