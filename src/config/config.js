const config = {
  environment: 'production',
  remoteUrl: 'https://api.spotify.com/v1/',
  spotifyAuthparams: {
    client_id: 'f09561735a2044789f11c9bbfd814238',
    redirect_uri: `${origin}/spotifycallback`,
    scope:
      'user-read-private user-top-read user-read-recently-played user-read-currently-playing playlist-modify-public playlist-modify-private user-read-play-history',
    show_dialog: true,
  },
};

export default config;
