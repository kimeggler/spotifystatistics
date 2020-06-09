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
  deezerAuthparams: {
    client_id: '412362',
    client_secret: 'fd272e3d6749d0728b102887e14c65f1',
    redirect_uri: `${origin}/deezercallback`,
    scope: 'basic_access,listening_history',
  },
};

export default config;
