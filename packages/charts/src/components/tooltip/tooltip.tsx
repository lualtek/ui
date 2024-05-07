import {
  Elevator,
  FCChildren, Panel, Stack, Title,
} from '@lualtek/react-components';

import styles from './tooltip.module.css';

export type TooltipProps = {
  active?: boolean;
  label?: string;
  payload?: any;
};

export const Tooltip: FCChildren<TooltipProps> = ({
  children,
  active,
  payload,
  label,
  ...otherProps
}) => (
  <Elevator resting={3}>
    <Panel
      radius={8}
      vibrant
      disableGlow
      vibrancyColor="soft"
      bordered
      className={styles.Tooltip}
      {...otherProps}
    >
      <Stack vPadding={8} hPadding={8}>
        <Title level="6">{label}</Title>
        {children && (
          <Stack vPadding={16}>
            {children}
          </Stack>
        )}
      </Stack>
    </Panel>
  </Elevator>
);

Tooltip.displayName = 'ChartTooltip';
