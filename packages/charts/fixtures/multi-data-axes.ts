export const MultiDataSeries = [
  {
    dataKey: 'value',
    serieKeyId: 'device1',
    side: 'left' as const,
    unit: '°C',
    name: 'Series 1',
    data: [
      { category: 'A', value: Math.random() },
      { category: 'B', value: Math.random() },
      { category: 'C', value: Math.random() },
    ],
  },
  {
    dataKey: 'value',
    serieKeyId: 'device2',
    side: 'left' as const,
    unit: '°C',
    name: 'Series 2',
    data: [
      { category: 'B', value: Math.random() },
      { category: 'C', value: Math.random() },
      { category: 'D', value: Math.random() },
    ],
  },
  {
    dataKey: 'value',
    serieKeyId: 'device3',
    side: 'left' as const,
    unit: '°C',
    name: 'Series 3',
    data: [
      { category: 'C', value: Math.random() },
      { category: 'D', value: Math.random() },
      { category: 'E', value: Math.random() },
    ],
  },
];
