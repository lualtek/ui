
/**
 * Hook parameters
 */
type UseStylesParams = {
  vibrancy?: {
    blur?: 'soft' | 'strong';
    color?: 'background' | 'soft' | 'mid' | 'hard';
    saturation?: 'standard' | 'high';
  };
  elevation?: {
    resting?: 0 | 1 | 2 | 3 | 4;
    onHover?: 0 | 1 | 2 | 3 | 4;
    direction?: 'right' | 'left' | 'top' | 'bottom';
    shadowColor?: string;
  };
}

const DEFAULT_PARAMS = {
  elevation: {
    direction: 'bottom',
    shadowColor: 'oklch(0% 0 0)',
  },
  vibrancy: {
    blur: 'strong',
    saturation: 'standard',
  },
};

export const useStyles = ({ elevation, vibrancy }: UseStylesParams = {}) => ({
  elevation: {
    attributes: {
      'data-elevation': elevation?.resting,
      'data-elevation-hover': elevation?.onHover,
      'data-elevation-direction': elevation?.direction ?? DEFAULT_PARAMS.elevation.direction,
    },
    style: {
      '--shadow-color': elevation?.shadowColor ?? DEFAULT_PARAMS.elevation.shadowColor,
    },
  },
  vibrancy: {
    attributes: {
      'data-vibrancy': vibrancy?.blur ?? DEFAULT_PARAMS.vibrancy.blur,
      'data-vibrancy-color': vibrancy?.color,
      'data-vibrancy-saturation': vibrancy?.saturation ?? DEFAULT_PARAMS.vibrancy.saturation,
    },
  },
});
