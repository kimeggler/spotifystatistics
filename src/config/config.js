const config = {
  environment: "production",
  remoteUrl: "https://api.spotify.com/v1/",
  authparams: {
    client_id: "f09561735a2044789f11c9bbfd814238",
    redirect_uri: origin,
    scope:
      "user-read-private user-top-read user-read-recently-played user-read-currently-playing"
  }
};

export default config;
