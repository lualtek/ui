import clsx from 'clsx';
import {
  ChangeEvent, forwardRef, ReactNode, SelectHTMLAttributes,
} from 'react';
import { useUIDSeed } from 'react-uid';

import {
  Icon, IconProps, Label, Stack,
} from '@/components';

import { LabelProps } from '../label';
import styles from './select.module.css';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  /**
   * Pass the children `option` elements. This is required.
   */
  children: ReactNode;
  /**
   * Change the default icon displayed on the side of the select.
   */
  icon?: IconProps['source'];
  /**
   * Set the accessible label for the select.
   */
  label?: ReactNode;
  /**
   * Set how many options can be selected at once.
   */
  kind?: 'single' | 'multiple';
  /**
   * Set the size of the select. This affects alsosize and style of the icon.
   */
  dimension?: 'regular' | 'small' | 'big';
  /**
   * Set disabled state. The select is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Callback function to be called when a new value is selected.
   */
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const sizes = {
  label: {
    small: 14,
    regular: 16,
    big: 18,
  },
  icon: {
    small: 12,
    regular: 16,
    big: 24,
  },
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  children,
  className,
  disabled = false,
  icon = 'increase',
  label,
  kind = 'single',
  dimension = 'regular',
  onChange,
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed();

  return (
    <Stack
      as="fieldset"
      rowGap={4}
      className={clsx(styles.Select, className)}
      data-select-is-multiple={kind === 'multiple'}
      data-select-has-label={Boolean(label)}
      data-select-dimension={dimension}
      aria-disabled={disabled}
      horizontalAlign="start"
      verticalAlign="start"
      inline
      tabIndex={disabled ? 0 : undefined}
    >
      {label && (
      <Label
        size={sizes.label[dimension] as LabelProps['size']}
        htmlFor={seedID('select')}
      >
        {label}
      </Label>
      )}
      <div className={styles.FieldContainer}>
        <select
          disabled={disabled}
          className={styles.Field}
          id={seedID('select')}
          multiple={kind === 'multiple'}
          onChange={onChange}
          ref={forwardedRef}
          {...otherProps}
        >
          {children}
        </select>

        { kind === 'single' && (
          <Icon
            className={styles.Icon}
            source={icon}
            dimension={sizes.icon[dimension] as IconProps['dimension']}
          />
        ) }
      </div>
    </Stack>
  );
});

Select.displayName = 'Select';
