import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import './Spinner.css';

const Spinner = ({ className }) => {
  return (
    <div className={cx('wrapper', className)}>
      <div className="loader">Loading...</div>
    </div>
  );
};

Spinner.propTypes = {
  className: PropTypes.string,
};

export default Spinner;
