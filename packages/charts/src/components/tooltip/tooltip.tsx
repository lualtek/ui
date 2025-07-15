'use client';

import {
  Elevator,
  Panel, Stack, Text, Title,
} from '@lualtek/react-components';
import { FC, Fragment, ReactNode } from 'react';
import { TooltipContentProps } from 'recharts';
import { SetRequired } from 'type-fest';

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
  label?: TooltipContentProps<any, any>['label'];
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
  formatLabel?: (label: any) => string;
  /**
   * custom function to format the payload labels
   * @param value TooltipEntry
   * @returns string
   */
  formatName?: (entry: SetRequired<TooltipEntry, 'name'>) => string;
  /**
   * custom function to format the payload values
   * @param entry TooltipEntry
   * @returns React.ReactNode
   */
  formatValue?: (entry: SetRequired<TooltipEntry, 'value'>) => React.ReactNode;
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
          <Fragment key={entry.name}>
            <Stack
              direction="row"
              vAlign="center"
              fill={false}
              inline
              columnGap={4}
            >
              <Text as="strong" lineHeight="extra-small" size={14} textColor={tooltipColors ? entry.color : undefined}>
                {entry.name && formatName
                  ? formatName(entry as SetRequired<TooltipEntry, 'name'>)
                  : entry.name}
                :
              </Text>
              <Text size={14} lineHeight="extra-small">
                {/** It can be zero! */}
                {(entry.value !== null && entry.value !== undefined) && formatValue
                  ? formatValue(entry as SetRequired<TooltipEntry, 'value'>)
                  : entry.value}
                {entry.unit}
              </Text>
            </Stack>
            {tooltipDecorator?.(entry)}
          </Fragment>
        ))}
      </Stack>
    </Panel>
  </Elevator>
);
