import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/fp/forEach';
import find from 'lodash/fp/find';

import breakpointsConfig from './breakpointsConfig';
import breakpointValidation from './breakpointValidation';

/**
 * Descriptively hide or show children components, based on a breakpoint
 * Uses matchMedia
 * Client-side only
 */
class HideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.breakpoint = '';

    forEach(bp => {
      const mediaQuery = find(['name', bp], breakpointsConfig.breakpoints).breakpoint;
      if (!this.breakpoint) {
        this.breakpoint = mediaQuery;
      } else {
        this.breakpoint += ` and ${mediaQuery}`;
      }
    }, props.breakpoint.split(' '));

    this.mql = null;
    this.onMatch = mql => this.updateVisibility(mql);

    // Class name for div (if shown)
    this.className = props.className;
  }

  componentDidMount() {
    if (!window.matchMedia) {
      throw new Error(
        'Window.matchMedia is not supported by your Browser. Please update your Browser!',
      );
    }

    this.mql = window.matchMedia(this.breakpoint);
    this.mql.addListener(this.onMatch);
    this.onMatch(this.mql);
  }

  componentWillUnmount() {
    if (this.mql) {
      this.mql.removeListener(this.onMatch);
    }
  }

  updateVisibility(mql) {
    const breakpointActive = !!mql.matches;

    if (this.props.hide) {
      this.setState({
        visible: !breakpointActive,
      });
    } else {
      this.setState({
        visible: breakpointActive,
      });
    }
  }

  render() {
    return this.state.visible ? <Fragment>{this.props.children}</Fragment> : null;
  }
}

HideShow.propTypes = {
  hide: PropTypes.bool.isRequired,
  breakpoint: breakpointValidation,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
};

HideShow.defaultProps = {
  breakpoint: breakpointsConfig.default,
};

export default HideShow;
