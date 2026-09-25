'use client';

import clsx from 'clsx';

import type { PolyRefComponent } from '@/components';
import styles from './panel.module.css';

export type PanelActionProps = React.ComponentPropsWithRef<'span'>;

/** Keep an independent control above Panel.Link. Use as to render the intended button or link. */
export const PanelAction: PolyRefComponent<'span', PanelActionProps> = ({
  as: Component = 'span',
  className,
  ref: forwardedRef,
  ...props
}) => <Component ref={forwardedRef} className={clsx(styles.Action, className)} {...props} />;
