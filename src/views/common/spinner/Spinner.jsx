import React from 'react';
import cx from 'classnames';

import { loader, wrapper } from './Spinner.module.css';

const Spinner = ({ className }) => {
  return (
    <div className={cx(wrapper, className)}>
      <div className={loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
