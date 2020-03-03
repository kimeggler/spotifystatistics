let cachedUserManager = null;

export const storeUserManager = userManager => {
  cachedUserManager = userManager;
  return cachedUserManager;
};

export const getUserManager = () => cachedUserManager;
