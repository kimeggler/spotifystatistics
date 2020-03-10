import React from 'react';
import { Userbadge } from '../';

import './_style.css';

function header() {
  return (
    <div className='header'>
      <h3>Statify</h3>

      <Userbadge />
    </div>
  );
}

export default header;
