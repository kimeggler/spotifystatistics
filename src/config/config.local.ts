interface LocalConfig {
  environment: 'development';
  remoteUrl: string;
}

const config: LocalConfig = {
  environment: 'development',
  remoteUrl: 'https://api.spotify.com/v1/',
};

export default config;
export type { LocalConfig };