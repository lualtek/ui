'use client';

import clsx from 'clsx';

import type { PolyRefComponent } from '@/components';
import { Panel, type PanelProps } from '../panel';

import styles from './linked-panel.module.css';

export type LinkedPanelProps = PanelProps & React.ComponentPropsWithRef<'div'>;
export type LinkedPanelLinkProps = React.ComponentPropsWithRef<'a'>;
export type LinkedPanelActionProps = React.ComponentPropsWithRef<'span'>;

/** A panel with one native navigation link and independent sibling actions. */
const LinkedPanelRoot = ({ className, ...props }: LinkedPanelProps) => (
  <Panel className={clsx(styles.LinkedPanel, className)} {...props} />
);

/** Render the panel's descriptive link, directly under the root so it can cover its surface. */
const LinkedPanelLink: PolyRefComponent<'a', LinkedPanelLinkProps> = ({
  as: Component = 'a',
  className,
  ref: forwardedRef,
  ...props
}) => <Component ref={forwardedRef} className={clsx(styles.Link, className)} {...props} />;

/** Keep a button or other independent control above the panel link. */
const LinkedPanelAction: PolyRefComponent<'span', LinkedPanelActionProps> = ({
  as: Component = 'span',
  className,
  ref: forwardedRef,
  ...props
}) => <Component ref={forwardedRef} className={clsx(styles.Action, className)} {...props} />;

export const LinkedPanel = Object.assign(LinkedPanelRoot, {
  Link: LinkedPanelLink,
  Action: LinkedPanelAction,
});
