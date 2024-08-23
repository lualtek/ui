export const cssEasingToArray = (cssEasing: string): number[] => {
  const [x1, y1, x2, y2] = cssEasing.replace(/[^0-9.,]+/g, '').split(',').map(i => parseFloat(i));
  return [x1, y1, x2, y2];
};
