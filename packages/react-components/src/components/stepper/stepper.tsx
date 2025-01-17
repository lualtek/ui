'use client';

import clsx from 'clsx';
import {
  ComponentPropsWithoutRef, forwardRef, useMemo,
} from 'react';
import { Except } from 'type-fest';

import {
  Glow,
  Stack, StackProps, TextChip, Title, TitleProps, useResponsiveContext,
} from '@/components';

import styles from './stepper.module.css';

export type StepperProps = Except<ComponentPropsWithoutRef<'div'>, 'title'> & {
  /**
   * The title of the step.
   */
  title: TitleProps['children'];
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

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(({
  className,
  children,
  title,
  step,
  contentGap = 16,
  fillContent = false,
  fullWidth = false,
  ...otherProps
}, forwardedRef) => {
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
        <Title level="5" as="h5">{title}</Title>
        {children}
      </Stack>
    </Stack>
  );
});
