import common from "./config.default";
import local from "./config.local";
import production from "./config";

// The config file for the required environment will be copied with the build-scripts
// It's copied over the config.js

const getConfig = () => {
  const env = process.env.NODE_ENV;
  if (env === "production") {
    return { ...common, ...production };
  }

  return { ...common, ...local };
};

export default getConfig();
