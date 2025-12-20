import { useCallback, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import {
  fetchArtists,
  fetchMyPlaylists,
  fetchMyProfile,
  fetchMyTopArtist,
  fetchMyTopTrack,
  fetchPlaylists,
  fetchTracks,
  TimeRange,
} from '../services/spotifyservice';
import { SpotifyArtist, SpotifyPlaylist, SpotifyTrack, SpotifyUser } from '../types/spotify';

export const useSpotify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { setGlobalLoading, setLoadingMessage } = useLoading();

  const handleRequest = useCallback(
    async <T>(request: () => Promise<T>, loadingMessage: string): Promise<T | null> => {
      try {
        setIsLoading(true);
        setError(null);
        setLoadingMessage(loadingMessage);
        setGlobalLoading(true);

        const result = await request();
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        console.error(loadingMessage, error);
        return null;
      } finally {
        setIsLoading(false);
        setGlobalLoading(false);
      }
    },
    [setGlobalLoading, setLoadingMessage],
  );

  const getProfile = useCallback(
    () => handleRequest<SpotifyUser>(() => fetchMyProfile(), 'Loading your profile...'),
    [handleRequest],
  );

  const getTopArtist = useCallback(
    (timerange: TimeRange, message?: string) =>
      handleRequest<SpotifyArtist>(
        () => fetchMyTopArtist(timerange),
        message ||
          `Loading your top artist ${timerange === 'short_term' ? 'from the last month' : timerange === 'medium_term' ? 'from the last 6 months' : 'of all time'}...`,
      ),
    [handleRequest],
  );

  const getArtists = useCallback(
    (timerange: TimeRange, message?: string) =>
      handleRequest<SpotifyArtist[]>(
        () => fetchArtists(timerange),
        message ||
          `Loading your top artists ${timerange === 'short_term' ? 'from the last month' : timerange === 'medium_term' ? 'from the last 6 months' : 'of all time'}...`,
      ),
    [handleRequest],
  );

  const getTopTrack = useCallback(
    (timerange: TimeRange, message?: string) =>
      handleRequest<SpotifyTrack>(
        () => fetchMyTopTrack(timerange),
        message ||
          `Loading your top track ${timerange === 'short_term' ? 'from the last month' : timerange === 'medium_term' ? 'from the last 6 months' : 'of all time'}...`,
      ),
    [handleRequest],
  );

  const getTracks = useCallback(
    (timerange: TimeRange, message?: string) =>
      handleRequest<SpotifyTrack[]>(
        () => fetchTracks(timerange),
        message ||
          `Loading your top tracks ${timerange === 'short_term' ? 'from the last month' : timerange === 'medium_term' ? 'from the last 6 months' : 'of all time'}...`,
      ),
    [handleRequest],
  );

  const getPlaylists = useCallback(
    (profile: SpotifyUser) =>
      handleRequest<SpotifyPlaylist[]>(() => fetchPlaylists(profile), 'Loading your playlists...'),
    [handleRequest],
  );

  const getMyPlaylists = useCallback(
    () => handleRequest<SpotifyPlaylist[]>(() => fetchMyPlaylists(), 'Loading your playlists...'),
    [handleRequest],
  );

  return {
    isLoading,
    error,
    getProfile,
    getTopArtist,
    getArtists,
    getTopTrack,
    getTracks,
    getPlaylists,
    getMyPlaylists,
  };
};
