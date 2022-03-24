import { FC, LabelHTMLAttributes } from 'react';

import { Text, TextProps } from '@/components';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & Pick<TextProps, 'size' | 'sentiment' | 'maxWidth' | 'responsive'> & {
  size?: TextProps['size'];
}

export const Label: FC<LabelProps> = ({
  children,
  size,
  ...otherProps
}) => (
  <Text as="label" size={size} {...otherProps}>
    {children}
  </Text>
);
