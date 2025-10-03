export interface RangeOption {
  label: string;
  value: 'short_term' | 'medium_term' | 'long_term';
}

const rangeOptions: RangeOption[] = [
  {
    label: '1 month',
    value: 'short_term',
  },
  {
    label: '6 months',
    value: 'medium_term',
  },
  {
    label: 'all time',
    value: 'long_term',
  },
];

export default rangeOptions;