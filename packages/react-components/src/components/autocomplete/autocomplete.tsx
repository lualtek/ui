import clsx from 'clsx';
import {
  Children,
  forwardRef, ForwardRefExoticComponent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDebouncedValue, useDimensionsRef } from 'rooks';

import {
  Menu,
  MenuProps, Popover, Skeleton, Stack, Text, Textfield, TextfieldProps,
} from '@/components';

import styles from './autocomplete.module.css';
import { AutocompleteOption, AutocompleteOptionProps } from './autocomplete-option';

export type AutocompleteProps = TextfieldProps & {
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
   * Show skeletons while loading option is set to true.
   */
  loading?: boolean;
  /**
   * List of options to use as suggestion
   */
  options?: AutocompleteOptionProps[];
};

type AutocompleteComponent = ForwardRefExoticComponent<AutocompleteProps> & {
  Option: ForwardRefExoticComponent<AutocompleteOptionProps>;
}

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(({
  className,
  children,
  disabled,
  readOnly,
  options,
  loading,
  value = '',
  maxHeight = '200px',
  emptyContent = 'No items to show',
  ...otherProps
}, forwardedRef) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [ref, dimensions] = useDimensionsRef();
  const [debouncedValue] = useDebouncedValue(
    currentValue,
    100,
  );

  const onInteractOutside = useCallback((currentTarget: EventTarget | null) => {
    if ((currentTarget as HTMLInputElement)?.id !== 'autocompleteInput') {
      setIsOpen(false);
    }
  }, []);

  const filteredOptions = useMemo(
    () => (debouncedValue
      ? options?.filter((item) => {
        const childrenText = Children.toArray(item.children)?.[0] as string;
        const debouncedLower = (debouncedValue as string).toLowerCase();
        return (
          item.value.toLowerCase().includes(debouncedLower)
          || childrenText?.toLowerCase().includes(debouncedLower)
        );
      })
      : options
    ),
    [debouncedValue, options],
  );

  const onClickOption = useCallback((text: string) => {
    setCurrentValue(text);
    setIsOpen(false);
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(styles.Autocomplete, className)}
    >
      <Popover open={isOpen}>
        <Popover.Anchor>
          <Textfield
            ref={forwardedRef}
            autoComplete="off"
            disabled={disabled}
            readOnly={readOnly}
            value={currentValue}
            onChange={event => setCurrentValue(event.target.value)}
            onFocus={() => setIsOpen(true)}
            id="autocompleteInput"
            {...otherProps}
          />
        </Popover.Anchor>
        <Popover.Content
          onOpenAutoFocus={event => event.preventDefault()}
          onInteractOutside={({ currentTarget }) => onInteractOutside(currentTarget)}
          onEscapeKeyDown={() => setIsOpen(false)}
        >
          <Menu
            role="listbox"
            className={styles.OptionsList}
            style={{ width: dimensions ? (dimensions.width + 2) : 'auto' }}
            maxHeight={maxHeight}
          >
            {(filteredOptions?.length === 0 && !loading) && <Text as="div" textAlign="center" dimmed={5}>{emptyContent}</Text>}
            {loading
              ? <Stack hPadding={8} as="span"><Skeleton count={3} /></Stack>
              : filteredOptions?.map(option => (
                <Autocomplete.Option
                  key={option.value}
                  value={option.value}
                  onClick={(_, text) => onClickOption(text!)}
                >
                  {option.children}
                </Autocomplete.Option>
              ))
            }
          </Menu>
        </Popover.Content>
      </Popover>
    </div>
  );
}) as AutocompleteComponent;

Autocomplete.Option = AutocompleteOption;
Autocomplete.displayName = 'Autocomplete';
