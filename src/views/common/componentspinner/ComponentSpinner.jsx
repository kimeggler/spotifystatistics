import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './ComponentSpinner.css';

const ComponentSpinner = ({ className }) => {
  return (
    <div className={cx('wrapper', className)}>
      <div className="loader">Loading...</div>
    </div>
  );
};

ComponentSpinner.propTypes = {
  className: PropTypes.string,
};

export default ComponentSpinner;
