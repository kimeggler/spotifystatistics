const { protocol, hostname, port } = window.location;

const origin = `${protocol}//${hostname}${port ? `:${port}` : ""}`;

const config = {
  protocol,
  hostname,
  port,
  origin,
  authority: "https://accounts.spotify.com/authorize",
  metadata: {
    authorization_endpoint: "https://accounts.spotify.com/authorize"
  }
};

export default config;
