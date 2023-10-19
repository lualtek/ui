'use client';

import clsx from 'clsx';
import {
  ComponentPropsWithoutRef, forwardRef, ReactNode, useMemo,
} from 'react';

import {
  Stack, StackProps, TextChip, Title, useResponsiveContext,
} from '@/components';

import styles from './stepper.module.css';

export type StepperProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * The title of the step.
   */
  title: ReactNode;
  /**
   * The step number.
   */
  step: number;
  /**
   * The content gap between the step number and the content.
   * @defaultValue 16
   */
  contentGap?: StackProps['rowGap'];
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(({
  className,
  children,
  title,
  step,
  contentGap = 16,
  ...otherProps
}, forwardedRef) => {
  const padStep = useMemo(() => String(step).padStart(2, '0'), [step]);
  const { matches } = useResponsiveContext();

  return (
    <Stack
      direction="row"
      columnGap={matches.medium ? 24 : 16}
      className={clsx(styles.Stepper, className)}
      ref={forwardedRef}
      {...otherProps}
    >
      <TextChip dimension={matches.medium ? 'regular' : 'small'} text={padStep} />

      <Stack
        vPadding={matches.medium ? 8 : 4}
        hAlign="start"
        fill={false}
        rowGap={contentGap}
        className={styles.Content}
      >
        <Title level="5" as="h5">{title}</Title>
        {children}
      </Stack>
    </Stack>
  );
});

Stepper.displayName = 'Stepper';
