import {
  Elevator,
  Panel, Stack, Text, Title,
} from '@lualtek/react-components';
import { FC, ReactNode } from 'react';

export type TooltipEntry = {
  dataKey?: string | number;
  name?: string;
  value?: number;
  unit?: ReactNode;
  color?: string;
  payload?: Record<string, number>;
}

export type TooltipProps = {
  /**
   * Whether the tooltip is active.
   */
  active?: boolean;
  /**
   * The label of the tooltip for the X-axis.
   */
  label?: string;
  /**
   * The payload of the tooltip.
   */
  payload?: TooltipEntry[];
  /**
   * Whether to show the payload colors inside tooltip.
   *
   * @defaultValue true
   */
  tooltipColors?: boolean;
  /**
   * custom function to format the tooltip label
   * @param value TooltipEntry
   * @returns string
   */
  formatLabel?: (label: string) => string;
  /**
   * custom function to format the payload labels
   * @param value TooltipEntry
   * @returns string
   */
  formatName?: (entry: TooltipEntry) => string;
  /**
   * custom function to format the payload values
   * @param entry TooltipEntry
   * @returns React.ReactNode
   */
  formatValue?: (entry: TooltipEntry) => React.ReactNode;
  /**
   * custom function to format the payload values
   * @param entry TooltipEntry
   * @returns React.ReactNode
   */
  tooltipDecorator?: (entry: TooltipEntry) => React.ReactNode;
}

export const Tooltip: FC<TooltipProps> = ({
  active,
  payload,
  formatLabel,
  formatName,
  formatValue,
  tooltipDecorator,
  tooltipColors = true,
  label,
}) => (
  <Elevator resting={3}>
    <Panel
      radius={8}
      vibrant
      showGlow
      vibrancyColor="soft"
      bordered
    >
      <Stack vPadding={8} hPadding={8} rowGap={8} fill={false} hAlign="start">
        {label && <Title level="6">{label && formatLabel ? formatLabel(label) : label}</Title>}
        {active && payload?.map(entry => (
          <>
            <Stack
              key={entry.name}
              direction="row"
              fill={false}
              inline
              columnGap={4}
            >
              <Text as="strong" lineHeight="extra-small" size={14} textColor={tooltipColors ? entry.color : undefined}>
                {entry.name && formatName ? formatName(entry) : entry.name}
                :
              </Text>
              <Text size={14} lineHeight="extra-small">
                {entry.value && formatValue ? formatValue(entry) : entry.value}
                {entry.unit}
              </Text>
            </Stack>
            {tooltipDecorator?.(entry)}
          </>
        ))}
      </Stack>
    </Panel>
  </Elevator>
);

Tooltip.displayName = 'ChartTooltip';
