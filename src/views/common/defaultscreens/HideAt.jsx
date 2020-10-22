import React from 'react';
import PropTypes from 'prop-types';

import HideShow from './HideShow';
import breakpointValidation from './breakpointValidation';

const HideAt = ({ breakpoint, children, className, style }) => (
  <HideShow breakpoint={breakpoint} className={className} style={style} hide>
    {children}
  </HideShow>
);

HideAt.propTypes = {
  breakpoint: breakpointValidation,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  style: PropTypes.shape(),
  className: PropTypes.string,
};

export default HideAt;
