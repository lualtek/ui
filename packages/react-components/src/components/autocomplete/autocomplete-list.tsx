import type { FC } from 'react';
import { useMemo } from 'react';

import type { AutocompleteProps } from '@/components';
import { Menu, Skeleton, Stack, Text, useResponsiveContext } from '@/components';

import { AutocompleteOption } from './autocomplete-option';
import styles from './autocomplete.module.css';

export type AutocompleteListProps = Pick<
  AutocompleteProps,
  'emptyContent' | 'matchFieldWidth' | 'loading' | 'maxHeight' | 'options'
> & {
  onClickOption: (value: string | number, text?: string) => void;
};

export const AutocompleteList: FC<AutocompleteListProps> = ({
  emptyContent,
  matchFieldWidth,
  loading,
  maxHeight,
  options,
  onClickOption,
}) => {
  const { matches } = useResponsiveContext();
  const isDesktop = useMemo(() => matches.small, [matches]);

  return (
    <Menu
      role="listbox"
      wrapWithPanel={isDesktop}
      className={styles.OptionsList}
      data-autocomplete-match-width={matchFieldWidth ?? loading}
      maxHeight={maxHeight}
    >
      {options?.length === 0 && !loading && (
        <Text as="div" align="center" dimmed={5}>
          {emptyContent}
        </Text>
      )}
      {loading ? (
        <Stack hPadding={16} vPadding={8} as="span">
          <Skeleton count={5} />
        </Stack>
      ) : (
        options?.map(({ value, children, ...rest }) => (
          <AutocompleteOption key={value} value={value} onClick={onClickOption} {...rest}>
            {children}
          </AutocompleteOption>
        ))
      )}
    </Menu>
  );
};
