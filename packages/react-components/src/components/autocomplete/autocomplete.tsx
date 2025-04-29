'use client';

import clsx from 'clsx';
import {
  Children,
  ComponentPropsWithRef,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDebounce } from 'react-use';

import {
  Menu,
  MenuProps, Panel, Popover, PopoverContentProps, Skeleton, Stack, Text, Textfield, TextfieldProps,
} from '@/components';

import styles from './autocomplete.module.css';
import { AutocompleteOption, AutocompleteOptionProps } from './autocomplete-option';

export type AutocompleteProps = TextfieldProps & {
  /**
   * Set the maximum height of the options list after which
   * it will scroll.
   * @defaultValue "200px"
   */
  maxHeight?: MenuProps['maxHeight'];
  /**
   * Set the alignment of the options list.
   * @defaultValue "center"
   */
  align?: PopoverContentProps['align'];
  /**
   * Custom empty content to display when there are no options or
   * when the value does not match any of the options.
   * @defaultValue "No items to show"
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
  /**
   * Whether the menu is forced to match the width of the field by clipping overflowing items.\
   * @defaultValue false
   */
  matchFieldWidth?: boolean;
  /**
   * Callback called when an option is selected.
   */
  onClickOption?: (value: AutocompleteOptionProps['value'], text?: string | null) => void;
};

type AutocompleteComponent = FC<AutocompleteProps> & {
  Option: FC<AutocompleteOptionProps>;
}

export const Autocomplete: AutocompleteComponent = ({
  className,
  children,
  disabled,
  readOnly,
  options,
  loading,
  onClickOption,
  value = '',
  maxHeight = '200px',
  emptyContent = 'No items to show',
  matchFieldWidth = false,
  align = 'center',
  ref: forwardedRef,
  ...otherProps
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState<typeof currentValue>();
  const [isOpen, setIsOpen] = useState(false);
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(currentValue);
    },
    100,
    [currentValue],
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
          String(item.value).toLowerCase().includes(debouncedLower)
          || childrenText?.toLowerCase().includes(debouncedLower)
        );
      })
      : options
    ),
    [debouncedValue, options],
  );

  const handleClickOption = useCallback((value: string | number, text?: string) => {
    setIsOpen(false);

    if (onClickOption) {
      onClickOption?.(value, text);
      return;
    }

    setCurrentValue(text ?? value);
  }, [onClickOption]);

  return (
    <div className={clsx(styles.Autocomplete, className)}>
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
          usePortal
          onOpenAutoFocus={event => event.preventDefault()}
          onInteractOutside={({ currentTarget }) => onInteractOutside(currentTarget)}
          onEscapeKeyDown={() => setIsOpen(false)}
          align={align}
        >
          <Menu
            role="listbox"
            className={styles.OptionsList}
            data-autocomplete-match-width={matchFieldWidth || loading}
            maxHeight={maxHeight}
          >
            {(filteredOptions?.length === 0 && !loading) && (
              <Text
                as="div"
                align="center"
                dimmed={5}
              >
                {emptyContent}
              </Text>
            )}
            {loading
              ? <Stack hPadding={16} vPadding={8} as="span"><Skeleton count={5} /></Stack>
              : filteredOptions?.map(({ value, children, ...rest }) => (
                <Autocomplete.Option
                  key={value}
                  value={value}
                  onClick={handleClickOption}
                  {...rest}
                >
                  {children}
                </Autocomplete.Option>
              ))
            }
          </Menu>
        </Popover.Content>
      </Popover>
    </div>
  );
};

Autocomplete.Option = AutocompleteOption;

