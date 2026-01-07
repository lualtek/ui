'use client';

import clsx from 'clsx';
import {
  FC, useMemo,
} from 'react';

import {
  Glow,
  Stack, StackProps, TextChip, Title, TitleProps, useResponsiveContext,
} from '@/components';

import styles from './stepper.module.css';

export type StepperProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * The title of the step.
   */
  heading: TitleProps['children'];
  /**
   * The step number.
   */
  step: number;
  /**
   * The content gap between the step number and the content.
   * @defaultValue 16
   */
  contentGap?: StackProps['rowGap'];
  /**
   * Fill the content to the available space.
   *
   * @defaultValue false
   */
  fillContent?: boolean;
  /**
   * Fill the width of the stepper.
   */
  fullWidth?: boolean;
}

export const Stepper: FC<StepperProps> = ({
  className,
  children,
  heading,
  step,
  contentGap = 16,
  fillContent = false,
  fullWidth = false,
  ref: forwardedRef,
  ...otherProps
}) => {
  const padStep = useMemo(() => String(step).padStart(2, '0'), [step]);
  const { matches } = useResponsiveContext();

  return (
    <Stack
      direction="row"
      columnGap={matches.medium ? 24 : 16}
      className={clsx(styles.Stepper, className)}
      fill={fullWidth}
      vAlign="start"
      ref={forwardedRef}
      {...otherProps}
    >
      <Glow innerRadius={matches.medium ? 12 : 8} borderOffset={0} borderWidth={1} spread={200} fitContent>
        <TextChip dimension={matches.medium ? 'regular' : 'small'} text={padStep} />
      </Glow>
      <Stack
        vPadding={matches.medium ? 8 : 4}
        fill={fillContent}
        rowGap={contentGap}
        className={styles.Content}
      >
        <Title level="5" as="h5">{heading}</Title>
        {children}
      </Stack>
    </Stack>
  );
};
