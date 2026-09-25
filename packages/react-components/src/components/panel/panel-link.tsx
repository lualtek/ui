'use client';

import clsx from 'clsx';

import type { PolyRefComponent } from '@/components';
import styles from './panel.module.css';

export type PanelLinkProps = React.ComponentPropsWithRef<'a'>;

/** A native link covering its parent Panel. Place directly inside a non-anchor Panel and provide an accessible name. */
export const PanelLink: PolyRefComponent<'a', PanelLinkProps> = ({
  as: Component = 'a',
  className,
  ref: forwardedRef,
  ...props
}) => <Component ref={forwardedRef} className={clsx(styles.Link, className)} {...props} />;
