const { protocol, hostname, port } = window.location;

const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

const config = {
  protocol,
  hostname,
  port,
  origin,
  spotifyAuthority: 'https://accounts.spotify.com/authorize',
  deezerAuthority: 'https://connect.deezer.com/oauth/auth.php',
  deezerAccess:
    'https://cors-anywhere.herokuapp.com/https://connect.deezer.com/oauth/access_token.php',
};

export default config;
