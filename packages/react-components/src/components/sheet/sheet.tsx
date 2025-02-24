'use client';

import React, { FC } from 'react';
import { DialogProps, Drawer as Vaul } from 'vaul';

import { Panel, useResponsiveContext } from '@/components';

import styles from './sheet.module.css';

export type SheetProps = DialogProps & {
  trigger: React.ReactNode;
}

export const Sheet: FC<SheetProps> = ({
  trigger,
  ...otherProps
}) => {
  const { matches } = useResponsiveContext();

  return (
    <Vaul.Root {...otherProps}>
      <Vaul.Trigger asChild>
        {trigger}
      </Vaul.Trigger>
      <Vaul.Portal>
        <Vaul.Overlay className={styles.Overlay} />
        <Vaul.Content className={styles.Content}>
          <Panel
            vibrant
            vibrancyColor="soft"
            bordered
            showGlow={matches.small}
            radius={matches.small ? 24 : [24, 24, 0, 0]}
            borderSide={matches.small ? 'all' : 'top'}
          >
            ciao
          </Panel>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
};
