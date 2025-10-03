import React from 'react';

interface FormattedNumberProps {
  value: number;
}

const FormattedNumber: React.FC<FormattedNumberProps> = ({ value }) => {
  const formatNumber = (num: number): string => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");
  };

  return <>{formatNumber(value)}</>;
};

export default FormattedNumber;
