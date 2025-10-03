const config = {
  environment: 'production',
  remoteUrl: 'https://api.spotify.com/v1/',
  spotifyAuthparams: {
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: `${origin}/callback`,
    scope:
      'user-read-private user-top-read user-read-recently-played user-read-currently-playing playlist-modify-public playlist-modify-private playlist-read-collaborative user-read-play-history',
    show_dialog: true,
  },
};

export default config;
