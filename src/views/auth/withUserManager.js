/* eslint-disable react/jsx-filename-extension */

import React from "react";

import { getUserManager } from "./userManager";

const withUserManager = EnhancedComponent => props => {
  const userManager = getUserManager();
  return <EnhancedComponent {...props} userManager={userManager} />;
};

export default withUserManager;
