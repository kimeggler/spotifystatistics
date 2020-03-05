import forEach from 'lodash/fp/forEach';
import some from 'lodash/fp/some';

import breakpointsConfig from './breakpointsConfig';

const breakpoints = (props, propName, componentName) => {
  let prop = props[propName];

  if (!prop) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Breakpoint is required. Given: ${prop}`
    );
  }

  prop = prop.split(' ');

  if (prop.length > 2) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Maximum number of breakpoints is 2. Given: ${prop.length}`
    );
  }

  let isValid = true;
  let lastBreakpoint = '';

  forEach(breakpoint => {
    // If breakpoint is invalid
    if (!some(['name', breakpoint], breakpointsConfig.breakpoints)) {
      isValid = false;
      lastBreakpoint = breakpoint;
      return false;
    }
    return true;
  }, prop);

  if (!isValid) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Invalid breakpoint name. Given: ${lastBreakpoint}`
    );
  }
  return null;
};

export default breakpoints;