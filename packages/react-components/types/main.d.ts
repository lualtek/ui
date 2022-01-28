declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

/**
 * Default CSS definition for typescript
 */
declare module 'csstype' {
  type Properties = Record<string, any>;
}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: React.FC<React.SVGAttributes<SVGElement>>;
  export default svgUrl;
  export { svgComponent as ReactComponent };
}

type PropsWithClass = {
  style?: Record<string, any>;
  className?: string;
}
