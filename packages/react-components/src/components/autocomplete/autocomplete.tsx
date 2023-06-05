'use client';

import clsx from 'clsx';
import {
  Children,
  forwardRef, ForwardRefExoticComponent,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { mergeRefs } from 'react-merge-refs';
import { useDebouncedValue } from 'rooks';

import {
  Menu,
  MenuProps, Popover, PopoverContentProps, Skeleton, Stack, Text, Textfield, TextfieldProps,
  useDimensionsRef,
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
   * Set the alignment of the options list.
   * @default center
   */
  align?: PopoverContentProps['align'];
  /**
   * Custom empty content to display when there are no options or
   * when the value does not match any of the options.
   * @default 'No items to show'
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
   * @default false
   */
  matchFieldWidth?: boolean;
  /**
   * Callback called when an option is selected.
   */
  onClickOption?: (value: AutocompleteOptionProps['value'], text?: string | null) => void;
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
  onClickOption,
  value = '',
  maxHeight = '200px',
  emptyContent = 'No items to show',
  matchFieldWidth = false,
  align = 'center',
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
            ref={mergeRefs([ref ?? null, forwardedRef])}
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
          usePortal={false}
          onOpenAutoFocus={event => event.preventDefault()}
          onInteractOutside={({ currentTarget }) => onInteractOutside(currentTarget)}
          onEscapeKeyDown={() => setIsOpen(false)}
          align={align}
        >
          <Menu
            role="listbox"
            className={styles.OptionsList}
            style={{
              width:
                  ((dimensions && matchFieldWidth) || (dimensions && loading))
                    ? (dimensions.width + 2)
                    : 'auto',
            }}
            maxHeight={maxHeight}
          >
            {(filteredOptions?.length === 0 && !loading) && (
              <Text
                as="div"
                textAlign="center"
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
}) as AutocompleteComponent;

Autocomplete.Option = AutocompleteOption;
Autocomplete.displayName = 'Autocomplete';
