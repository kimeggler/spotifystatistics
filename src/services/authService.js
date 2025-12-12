import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import config from '../config';

const { protocol, hostname, port } = window.location;
const origin = `${protocol}//${hostname}${port ? `:${port}` : ''}`;

// Spotify OAuth 2.0 with PKCE configuration
const oidcConfig = {
  authority: 'https://accounts.spotify.com',
  client_id: config.spotifyAuthparams.client_id,
  redirect_uri: `${origin}/callback`,
  response_type: 'code',
  scope: config.spotifyAuthparams.scope,
  post_logout_redirect_uri: origin,

  // PKCE settings
  response_mode: 'query',

  // Spotify-specific metadata
  metadata: {
    issuer: 'https://accounts.spotify.com',
    authorization_endpoint: 'https://accounts.spotify.com/authorize',
    token_endpoint: 'https://accounts.spotify.com/api/token',
    userinfo_endpoint: 'https://api.spotify.com/v1/me',
  },

  // Storage
  userStore: new WebStorageStateStore({ store: window.localStorage }),

  // Additional settings
  automaticSilentRenew: false,
  loadUserInfo: false,

  // PKCE
  extraQueryParams: {
    show_dialog: config.spotifyAuthparams.show_dialog,
  },
};

// Create UserManager instance
const userManager = new UserManager(oidcConfig);

// Auth service methods
export const authService = {
  // Sign in - redirects to Spotify
  signIn: async () => {
    try {
      await userManager.signinRedirect();
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  },

  // Handle callback after redirect from Spotify
  signInCallback: async () => {
    try {
      const user = await userManager.signinRedirectCallback();
      return user;
    } catch (error) {
      console.error('Error during sign in callback:', error);
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await userManager.removeUser();
      window.localStorage.clear();
      window.location.href = origin;
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  },

  // Get current user
  getUser: async () => {
    try {
      const user = await userManager.getUser();
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Get access token
  getAccessToken: async () => {
    try {
      const user = await userManager.getUser();
      return user?.access_token || null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: async () => {
    try {
      const user = await userManager.getUser();
      if (!user) return true;

      const currentTime = Math.floor(Date.now() / 1000);
      return user.expires_at ? user.expires_at < currentTime : true;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  },
};

export default authService;
