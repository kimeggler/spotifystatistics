import React from 'react';
import cx from 'classnames';

import { loader, wrapper } from './ComponentSpinner.module.css';

const ComponentSpinner = ({ className }) => {
  return (
    <div className={cx(wrapper, className)}>
      <div className={loader}>Loading...</div>
    </div>
  );
};

export default ComponentSpinner;
