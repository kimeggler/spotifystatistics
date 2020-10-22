import React from 'react';

const FormattedNumber = ({ value }) => {
  const formattedString = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");
  return <>{formattedString}</>;
};

export default FormattedNumber;
