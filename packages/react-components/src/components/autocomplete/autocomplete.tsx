'use client';

import clsx from 'clsx';
import { Children, FC, ReactNode, useCallback, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

import {
  MenuProps,
  Popover,
  PopoverContentProps,
  Sheet,
  SheetProps,
  Stack,
  Textfield,
  TextfieldProps,
  useResponsiveContext,
} from '@/components';

import { AutocompleteList } from './autocomplete-list';
import { AutocompleteOptionProps } from './autocomplete-option';
import styles from './autocomplete.module.css';

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
   * Set the index of the nested sheet on mobile devices.
   * @defaultValue 2
   */
  zIndex?: SheetProps['zIndex'];
  /**
   * Callback called when an option is selected.
   */
  onClickOption?: (value: AutocompleteOptionProps['value'], text?: string | null) => void;
};

export const Autocomplete: FC<AutocompleteProps> = ({
  className,
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
  zIndex = 2,
  style,
  ...otherProps
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [debouncedValue, setDebouncedValue] = useState<typeof currentValue>();
  const [isOpen, setIsOpen] = useState(false);
  const { matches } = useResponsiveContext();
  const isDesktop = useMemo(() => matches.small, [matches]);

  const [, _] = useDebounce(
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
    () =>
      debouncedValue
        ? options?.filter((item) => {
            const childrenText = Children.toArray(item.children)?.[0] as string;
            const debouncedLower = (debouncedValue as string).toLowerCase();
            return (
              String(item.value).toLowerCase().includes(debouncedLower) ||
              childrenText?.toLowerCase().includes(debouncedLower)
            );
          })
        : options,
    [debouncedValue, options],
  );

  const handleClickOption = useCallback(
    (value: string | number, text?: string) => {
      setIsOpen(false);

      if (onClickOption) {
        onClickOption?.(value, text);
        return;
      }

      setCurrentValue(text ?? value);
    },
    [onClickOption],
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
              type="search"
              onChange={(event) => setCurrentValue(event.target.value)}
              onFocus={() => setIsOpen(true)}
              id="autocompleteInput"
              style={style}
              {...otherProps}
            />
          </Popover.Anchor>
          <Popover.Content
            usePortal={usePortal}
            onOpenAutoFocus={(event) => event.preventDefault()}
            onInteractOutside={({ currentTarget }) => onInteractOutside(currentTarget)}
            onEscapeKeyDown={() => setIsOpen(false)}
            align={align}
          >
            <AutocompleteList
              emptyContent={emptyContent}
              matchFieldWidth={matchFieldWidth}
              loading={loading}
              maxHeight={maxHeight}
              options={filteredOptions}
              onClickOption={handleClickOption}
            />
          </Popover.Content>
        </Popover>
      ) : (
        /**
         * Fallback to Sheet for mobile devices with UI adapted to touch interactions
         */
        <Sheet
          heading="Search options"
          showHeading={false}
          noPadding
          nested
          open={isOpen}
          zIndex={zIndex}
          onOpenChange={(open) => setIsOpen(open)}
          trigger={
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
          }
        >
          <Stack hPadding={24} vPadding={[8, 8]}>
            <Textfield
              {...otherProps}
              icon="zoom"
              showClearButton
              onClear={() => {
                setCurrentValue('');
              }}
              fullWidth
              ref={forwardedRef}
              autoComplete="off"
              label=""
              value={currentValue}
              type="search"
              onChange={(event) => setCurrentValue(event.target.value)}
              id="autocompleteInput"
            />
          </Stack>
          <AutocompleteList
            emptyContent={emptyContent}
            matchFieldWidth={matchFieldWidth}
            loading={loading}
            maxHeight={maxHeight}
            options={filteredOptions}
            onClickOption={handleClickOption}
          />
        </Sheet>
      )}
    </div>
  );
};
