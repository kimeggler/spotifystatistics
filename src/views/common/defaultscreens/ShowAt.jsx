import React from 'react';
import PropTypes from 'prop-types';

import HideShow from './HideShow';
import breakpointValidation from './breakpointValidation';

const ShowAt = ({ breakpoint, children, className }) => (
  <HideShow breakpoint={breakpoint} hide={false} className={className}>
    {children}
  </HideShow>
);

ShowAt.propTypes = {
  breakpoint: breakpointValidation,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
};

export default ShowAt;
