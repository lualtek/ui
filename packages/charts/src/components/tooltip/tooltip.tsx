import {
  Elevator,
  FCChildren, Panel, Stack, Text, Title,
} from '@lualtek/react-components';

import styles from './tooltip.module.css';

export type TooltipEntry = {
  dataKey?: string | number;
  name?: string;
  value?: number;
  unit?: React.ReactNode;
  color?: string;
  payload?: Record<string, number>;
}

export type TooltipProps = {
  active?: boolean;
  label?: string;
  payload?: TooltipEntry[];
}

export const Tooltip: FCChildren<TooltipProps> = ({
  children,
  active,
  payload,
  label,
  ...otherProps
}) => (active ? (
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
        {payload?.map(entry => (
          <Stack
            key={entry.name}
            direction="row"
            fill={false}
            inline
            columnGap={4}
          >
            <Text as="strong" size={14} textColor={entry.color}>
              {entry.name}
              :
            </Text>
            <Text size={14}>
              {entry.value}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Panel>
  </Elevator>
) : null);

Tooltip.displayName = 'ChartTooltip';
