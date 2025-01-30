/**
 * Hook parameters
 */
export type VibrancyBlur = 'soft' | 'strong';
export type VibrancyColor = 'background' | 'soft' | 'mid' | 'hard' | 'red' | 'yellow' | 'green' | 'brand';
export type VibrancySaturation = 'standard' | 'high';
export type ElevationLevel = 0 | 1 | 2 | 3 | 4;
export type ElevationDirection = 'right' | 'left' | 'top' | 'bottom';
export type ElevationShadowColor = string;

type UseStylesParams = {
  vibrancy?: {
    blur?: VibrancyBlur;
    color?: VibrancyColor;
    saturation?: VibrancySaturation;
  };
  elevation?: {
    resting?: ElevationLevel;
    onHover?: ElevationLevel;
    direction?: ElevationDirection;
    shadowColor?: ElevationShadowColor;
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
      'data-vibrancy': true,
      'data-vibrancy-color': vibrancy?.color,
      'data-vibrancy-blur': vibrancy?.blur ?? DEFAULT_PARAMS.vibrancy.blur,
      'data-vibrancy-saturation': vibrancy?.saturation ?? DEFAULT_PARAMS.vibrancy.saturation,
    },
  },
});
