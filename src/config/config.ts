interface Config {
  environment: 'production' | 'development';
  remoteUrl: string;
}

const config: Config = {
  environment: 'production',
  remoteUrl: 'https://api.spotify.com/v1/',
};

export default config;
export type { Config };
