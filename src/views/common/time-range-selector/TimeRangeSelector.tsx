import cx from 'classnames';
import React from 'react';
import rangeOptions, { RangeOption } from '../top-track/range-options';

interface TimeRangeSelectorProps {
  timerange: RangeOption['value'];
  onTimerangeChange: (value: RangeOption['value']) => void;
  isLoading?: boolean;
  className?: string;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  timerange,
  onTimerangeChange,
  isLoading = false,
  className = '',
}) => {
  return (
    <div className={cx('bg-white/5 backdrop-blur-md rounded-xl p-2 max-w-sm mx-auto', className)}>
      <div className="flex gap-1">
        {rangeOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !isLoading && onTimerangeChange(option.value)}
            disabled={Boolean(isLoading)}
            className={cx(
              'flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
              option.value === timerange
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5',
              isLoading && 'opacity-50 cursor-not-allowed',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector;
