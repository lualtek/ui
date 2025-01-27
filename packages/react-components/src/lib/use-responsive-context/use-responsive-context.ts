/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import jsonTokens from '@lualtek/tokens/platforms/web/tokens.json';
import constate from 'constate';
import { useCallback, useEffect, useState } from 'react';

type Breakpoints = {
  extraSmall: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  wide: string;
};

type BreakpointsKeys = keyof Breakpoints;

const DEFAULT_BREAKPOINTS: Breakpoints = {
  extraSmall: jsonTokens.breakpoint['extra-small'].em,
  small: jsonTokens.breakpoint.small.em,
  medium: jsonTokens.breakpoint.medium.em,
  large: jsonTokens.breakpoint.large.em,
  extraLarge: jsonTokens.breakpoint['extra-large'].em,
  wide: jsonTokens.breakpoint.wide.em,
};

const breakpointKeys = Object.keys(DEFAULT_BREAKPOINTS) as Array<BreakpointsKeys>;

const DEFAULT_BREAKPOINTS_MATCHES: Record<BreakpointsKeys, boolean> = {
  extraSmall: false,
  small: false,
  medium: false,
  large: false,
  extraLarge: false,
  wide: false,
};

const matchMediaFactory = (breakpointKey: BreakpointsKeys) =>
  window.matchMedia(`(${DEFAULT_BREAKPOINTS[breakpointKey]} <= width)`);

const useResponsive = () => {
  const [matches, setMatches] = useState<Record<BreakpointsKeys, boolean>>(DEFAULT_BREAKPOINTS_MATCHES);

  const onChange = useCallback(
    (key: BreakpointsKeys) => (event: MediaQueryListEvent) => setMatches((old) => ({ ...old, [key]: event.matches })),
    [],
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const results = breakpointKeys.reduce(
      (acc, src) => {
        acc[src] = matchMediaFactory(src).matches;
        return acc;
      },
      {} as Record<BreakpointsKeys, boolean>,
    );

    setMatches(results);
  }, []);

  useEffect(() => {
    const mediaQueryList = breakpointKeys.reduce(
      (acc, src) => {
        acc[src] = matchMediaFactory(src);
        acc[src].addEventListener('change', onChange(src));
        return acc;
      },
      {} as Record<BreakpointsKeys, MediaQueryList>,
    );

    return () => {
      for (const breakpoint of Object.keys(mediaQueryList) as Array<BreakpointsKeys>) {
        mediaQueryList[breakpoint].removeEventListener('change', onChange(breakpoint));
      }
    };
  }, [onChange]);

  return { matches };
};

export const [ResponsiveProvider, useResponsiveContext] = constate(useResponsive);
