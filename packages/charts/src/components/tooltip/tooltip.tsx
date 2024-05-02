import { FCChildren, Panel, Stack } from '@lualtek/react-components';

export type TooltipProps = Record<string, unknown>

export const Tooltip: FCChildren<TooltipProps> = ({
  children,
  ...otherProps
}) => (
  <Panel radius={16} bordered vibrant {...otherProps}>
    <Stack vPadding={16} hPadding={16}>
      {children}
    </Stack>
  </Panel>
);

Tooltip.displayName = 'Tooltip';
