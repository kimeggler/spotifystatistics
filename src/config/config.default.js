const { protocol, hostname, port } = window.location;

const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

const config = {
  protocol,
  hostname,
  port,
  origin,
  spotifyAuthority: 'https://accounts.spotify.com/authorize',
};

export default config;
