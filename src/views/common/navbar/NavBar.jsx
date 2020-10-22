import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { ShowAt } from '..';

import './style.css';

import navigationItems from './navigation-items';

const Navigation = () => {
  const currentPath = window.location.pathname;

  return (
    <Fragment>
      <ShowAt breakpoint="1000AndBelow">
        <div></div>
      </ShowAt>

      <ShowAt breakpoint="1000AndAbove">
        <div className="navigation">
          {navigationItems.map((p, i) => (
            <Link
              key={i}
              to={p.path}
              className={cx(
                'navigation-item',
                currentPath === p.path ? 'navigation-active' : 'navigation-inactive',
              )}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </ShowAt>
    </Fragment>
  );
};

export default Navigation;
