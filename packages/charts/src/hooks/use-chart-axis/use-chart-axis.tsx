import { useMemo } from 'react';
import { ChartDataBaseType } from 'src/components/base-chart/base-chart';
import { LineProps } from 'src/components/line-chart/line-chart';

// NOTE: this is crazy - Find the longest y axis value by chars
const getYValuesLength = <D extends ChartDataBaseType, L extends LineProps<D>>(
  data: D[],
  notBiaxialLines: L[],
  biaxialLines: L[],
) => data.reduce((acc, item) => {
    const valuesLinesNotBiaxial = notBiaxialLines.map(serie => Number(item[serie.serieKeyId]));
    const valuesLinesBiaxial = biaxialLines.map(serie => Number(item[serie.serieKeyId]));

    const valuesNotBiaxial = Math.floor(Math.max(...valuesLinesNotBiaxial));
    const valuesBiaxial = Math.floor(Math.max(...valuesLinesBiaxial));
    return [
      String(valuesNotBiaxial).length + 1 > acc[0] ? String(valuesNotBiaxial).length + 1 : acc[0],
      String(valuesBiaxial).length + 1 > acc[1] ? String(valuesBiaxial).length + 1 : acc[1],
    ];
  }, [0, 0]);

export const useChartAxis = <D extends ChartDataBaseType, L extends LineProps<D>>({
  data,
  series,
}: { data: D[]; series: L[] }) => {
  const [notBiaxialLines, biaxialLines] = useMemo(() => series.reduce<[L[], L[]]>(
    (acc, serie) => {
      acc[serie.side === 'right' ? 1 : 0].push(serie);
      return acc;
    }, [[], []],
  ), [series]);

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

  const hasLeftY = series.some(({ side }) => side === 'left');
  const hasRightY = series.some(({ side }) => side === 'right');

  return {
    yAxisWidthNotBiaxial,
    yAxisWidthBiaxial,
    hasLeftY,
    hasRightY,
  };
};
