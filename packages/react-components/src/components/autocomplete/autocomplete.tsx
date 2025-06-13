'use client';

import clsx from 'clsx';
import {
  Children,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useDebounce } from 'react-use';
import { Except } from 'type-fest';

import {
  Menu,
  MenuProps, Panel, Popover, PopoverContentProps, Sheet, Skeleton, Stack, Text, Textfield, TextfieldProps,
  useResponsiveContext,
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
   * Whether to use a portal for the options list. Set to false when
   * autocomplete is inside a sheet.
   * @defaultValue true
   */
  usePortal?: PopoverContentProps['usePortal'];
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
  usePortal = true,
  ref: forwardedRef,
  style,
  ...otherProps
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState<typeof currentValue>();
  const { matches } = useResponsiveContext();
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMemo(() => matches.small, [matches]);

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

  const List = useCallback(
    () => (
      <Menu
        role="listbox"
        wrapWithPanel={isDesktop}
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
          : (matches.small ? filteredOptions : options)?.map(({ value, children, ...rest }) => (
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
    ),
    [isDesktop, matchFieldWidth, loading, maxHeight, filteredOptions,
      emptyContent, matches.small, options, handleClickOption],
  );

  return (
    <div className={clsx(styles.Autocomplete, className)}>
      {isDesktop ? (
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
              style={style}
              {...otherProps}
            />
          </Popover.Anchor>
          <Popover.Content
            usePortal={usePortal}
            onOpenAutoFocus={event => event.preventDefault()}
            onInteractOutside={({ currentTarget }) => onInteractOutside(currentTarget)}
            onEscapeKeyDown={() => setIsOpen(false)}
            align={align}
          >
            <List />
          </Popover.Content>
        </Popover>
      )
        : (
          <Sheet
            heading="Search options"
            showHeading={false}
            noPadding
            nested
            open={isOpen}
            onOpenChange={open => setIsOpen(open)}
            trigger={(
              <Textfield
                ref={forwardedRef}
                autoComplete="off"
                disabled={disabled}
                readOnly={readOnly}
                value={currentValue}
                id="autocompleteInput"
                style={style}
                {...otherProps}
              />
            )}
          >
            <Stack hPadding={24} vPadding={[8, 8]}>
              <Textfield
                {...otherProps}
                fullWidth
                ref={forwardedRef}
                autoComplete="off"
                label=""
                onChange={event => setCurrentValue(event.target.value)}
                id="autocompleteInput"
              />
            </Stack>
            <List />
          </Sheet>
        )
      }
    </div>
  );
};

Autocomplete.Option = AutocompleteOption;

