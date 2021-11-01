import React from 'react';
import PropTypes from 'prop-types';

const FormattedNumber = ({ value }) => {
  const formattedString = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'");
  return <>{formattedString}</>;
};

FormattedNumber.propTypes = {
  value: PropTypes.number,
};

export default FormattedNumber;
