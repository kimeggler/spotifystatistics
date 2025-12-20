import { User, UserManager, UserManagerSettings } from 'oidc-client-ts';

class AuthService {
  private userManager: UserManager;

  constructor() {
    // Determine redirect URI based on environment
    // For local development, MUST use 127.0.0.1 (Spotify doesn't allow localhost)
    const getRedirectUri = (): string => {
      // Check if we have an explicit redirect URI in env
      if (import.meta.env.VITE_REDIRECT_URI) {
        return import.meta.env.VITE_REDIRECT_URI;
      }

      // For local development (http:// or port 3000), use 127.0.0.1
      const isLocal =
        window.location.protocol === 'http:' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.port === '3000';

      if (isLocal) {
        return 'http://127.0.0.1:3000/callback';
      }

      // For production, use the current origin
      return `${window.location.origin}/callback`;
    };

    const settings: UserManagerSettings = {
      authority: 'https://accounts.spotify.com',
      client_id: import.meta.env.VITE_CLIENT_ID,
      redirect_uri: getRedirectUri(),
      scope:
        'user-read-private user-read-email user-top-read user-read-recently-played user-read-currently-playing playlist-modify-public playlist-modify-private playlist-read-collaborative user-read-play-history',
      response_type: 'code',
      automaticSilentRenew: false,
      includeIdTokenInSilentRenew: false,
      monitorSession: false,
      loadUserInfo: false,
      metadata: {
        issuer: 'https://accounts.spotify.com',
        authorization_endpoint: 'https://accounts.spotify.com/authorize',
        token_endpoint: 'https://accounts.spotify.com/api/token',
        userinfo_endpoint: 'https://api.spotify.com/v1/me',
        code_challenge_methods_supported: ['S256'],
        response_types_supported: ['code'],
        grant_types_supported: ['authorization_code'],
      },
    };

    this.userManager = new UserManager(settings);

    // Set up event handlers
    this.userManager.events.addAccessTokenExpired(() => {
      this.signOut();
    });
  }

  public async signIn(): Promise<void> {
    try {
      await this.userManager.signinRedirect();
    } catch (error) {
      console.error('Error during sign in:', error);
      throw error;
    }
  }

  public async signInCallback(): Promise<User> {
    try {
      const user = await this.userManager.signinRedirectCallback();
      if (!user) {
        throw new Error('No user returned from sign in callback');
      }
      return user;
    } catch (error) {
      console.error('Error during sign in callback:', error);
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    try {
      await this.userManager.signoutRedirect({
        post_logout_redirect_uri: window.location.origin,
      });
    } catch (error) {
      console.error('Error during sign out:', error);
      // Even if the redirect fails, clear local storage
      await this.userManager.removeUser();
    }
  }

  public async getUser(): Promise<User | null> {
    try {
      return await this.userManager.getUser();
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  public async getAccessToken(): Promise<string | null> {
    try {
      const user = await this.getUser();
      return user?.access_token || null;
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.getUser();
      return user !== null && !user.expired;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  }

  public async removeUser(): Promise<void> {
    try {
      await this.userManager.removeUser();
    } catch (error) {
      console.error('Error removing user:', error);
    }
  }
}

// Create a singleton instance
const authService = new AuthService();
export default authService;
