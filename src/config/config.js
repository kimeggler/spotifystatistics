const config = {
  environment: "production",
  remoteUrl: "https://api.spotify.com/v1/",
  authparams: {
    client_id: "f09561735a2044789f11c9bbfd814238",
    redirect_uri: `${origin}/callback`,
    scope:
      "user-read-private user-top-read user-read-recently-played user-read-currently-playing playlist-modify-public playlist-read-private user-read-play-history",
    show_dialog: true
  }
};

export default config;
