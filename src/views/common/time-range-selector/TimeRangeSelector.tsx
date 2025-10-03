import React from 'react';
import cx from 'classnames';
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
  className = ""
}) => {
  return (
    <div className={cx("bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 max-w-sm mx-auto", className)}>
      <div className="grid grid-cols-3 gap-2">
        {rangeOptions.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !isLoading && onTimerangeChange(option.value)}
            disabled={Boolean(isLoading)}
            className={cx(
              "px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200",
              option.value === timerange
                ? "bg-statfy-purple-500 text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10",
              isLoading && "opacity-50 cursor-not-allowed"
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