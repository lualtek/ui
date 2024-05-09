import { useMemo } from 'react';
import { ChartDataBaseType } from 'src/components/base-chart/base-chart';
import { LineChartLineProps } from 'src/components/line-chart/line-chart';

// NOTE: this is crazy - Find the longest y axis value by chars
const getYValuesLength = <D extends ChartDataBaseType, L extends LineChartLineProps<D>>(
  data: D[],
  notBiaxialLines: L[],
  biaxialLines: L[],
) => data.reduce((acc, item) => {
    const valuesLinesNotBiaxial = notBiaxialLines.map(line => Number(item[line.lineKeyId]));
    const valuesLinesBiaxial = biaxialLines.map(line => Number(item[line.lineKeyId]));

    const valuesNotBiaxial = Math.floor(Math.max(...valuesLinesNotBiaxial));
    const valuesBiaxial = Math.floor(Math.max(...valuesLinesBiaxial));
    return [
      String(valuesNotBiaxial).length + 1 > acc[0] ? String(valuesNotBiaxial).length + 1 : acc[0],
      String(valuesBiaxial).length + 1 > acc[1] ? String(valuesBiaxial).length + 1 : acc[1],
    ];
  }, [0, 0]);

export const useChartAxis = <D extends ChartDataBaseType, L extends LineChartLineProps<D>>({
  data,
  lines,
}: { data: D[]; lines: L[] }) => {
  const [notBiaxialLines, biaxialLines] = useMemo(() => lines.reduce<[L[], L[]]>(
    (acc, line) => {
      acc[line.side === 'right' ? 1 : 0].push(line);
      return acc;
    }, [[], []],
  ), [lines]);

  const [yAxisWidthNotBiaxial, yAxisWidthBiaxial] = useMemo(() => {
    if (data.length === 0) {
      return [0, 0];
    }

    const [maxLabelLengthNotBiaxial, maxLabelLengthBiaxial] = getYValuesLength(data, notBiaxialLines, biaxialLines);

    return [
      maxLabelLengthNotBiaxial * 10,
      maxLabelLengthBiaxial * 10,
    ];
  }, [data, notBiaxialLines, biaxialLines]);

  const hasLeftY = lines.some(({ side }) => side === 'left');
  const hasRightY = lines.some(({ side }) => side === 'right');

  return {
    yAxisWidthNotBiaxial,
    yAxisWidthBiaxial,
    hasLeftY,
    hasRightY,
  };
};
