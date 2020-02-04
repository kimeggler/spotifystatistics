import React from 'react';
import '_style.css';

function button(text) {
  return (
    <div className="button">
      <p className="button-label">{text}</p>
    </div>
  );
}

export default button;
