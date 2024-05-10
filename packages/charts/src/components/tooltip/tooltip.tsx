import {
  Elevator,
  Panel, Stack, Text, Title,
} from '@lualtek/react-components';
import { FC } from 'react';

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

export const Tooltip: FC<TooltipProps> = ({
  active,
  payload,
  label,
}) => (
  <Elevator resting={3}>
    <Panel
      radius={8}
      vibrant
      disableGlow
      vibrancyColor="soft"
      bordered
    >
      <Stack vPadding={8} hPadding={8} rowGap={8}>
        <Title level="6">{label}</Title>
        {active && payload?.map(entry => (
          <Stack
            key={entry.name}
            direction="row"
            fill={false}
            inline
            columnGap={4}
          >
            <Text as="strong" lineHeight="extra-small" size={14} textColor={entry.color}>
              {entry.name}
              :
            </Text>
            <Text size={14} lineHeight="extra-small">
              {entry.value}
              {' '}
              {entry.unit}
            </Text>
          </Stack>
        ))}
      </Stack>
    </Panel>
  </Elevator>
);

Tooltip.displayName = 'ChartTooltip';
