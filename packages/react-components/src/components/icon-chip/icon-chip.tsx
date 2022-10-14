import { IconNames } from '@lualtek/icons';
import { TokensTypes } from '@lualtek/tokens';
import clsx from 'clsx';

import { Icon, IconProps, Stack } from '@/components';

import * as styles from './icon-chip.module.css';

export type IconChipProps = {
  /**
   * Set the dimension of the component.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set a color from one of the provided values.
   */
  color?: TokensTypes['colors'];
  /**
   * Set the icon to show
   */
  icon: IconNames;
}

type Sizes = Record<string, {
  icon: IconProps['dimension'];
}>

export const IconChip: FCClass<IconChipProps> = ({
  className,
  dimension = 'regular',
  color = 'gray',
  icon,
  ...otherProps
}) => {
  const sizes: Sizes = {
    small: {
      icon: 12,
    },
    regular: {
      icon: 18,
    },
    big: {
      icon: 24,
    },
  };

  return (
    <Stack
      as="span"
      direction="row"
      inline
      fill={false}
      data-chip-color={color}
      data-chip-dimension={dimension}
      className={clsx(styles.IconChip, className)}
      vAlign="center"
      hAlign="center"
      {...otherProps}
    >
      <Icon
        source={icon}
        dimension={sizes[dimension].icon}
      />
    </Stack>
  );
};

IconChip.displayName = 'IconChip';
