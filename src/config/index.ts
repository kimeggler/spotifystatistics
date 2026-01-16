import production, { Config } from './config';
import common, { LocationConfig } from './config.default';
import local, { LocalConfig } from './config.local';

type CombinedConfig = LocationConfig & (Config | LocalConfig);

// The config file for the required environment will be copied with the build-scripts
// It's copied over the config.js

const getConfig = (): CombinedConfig => {
  const env = import.meta.env.MODE;

  if (env === 'production') {
    return { ...common, ...production };
  }

  return { ...common, ...local };
};

export default getConfig();
export type { CombinedConfig };
