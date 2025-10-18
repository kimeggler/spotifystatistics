interface LocationConfig {
  protocol: string;
  hostname: string;
  port: string;
  origin: string;
  spotifyAuthority: string;
}

const { protocol, hostname, port } = window.location;

const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

const config: LocationConfig = {
  protocol,
  hostname,
  port,
  origin,
  spotifyAuthority: 'https://accounts.spotify.com/authorize',
};

export default config;
export type { LocationConfig };