import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { DefaultErrorMessage, Playlist, Spinner } from '../../common';
import { getAudioAnalysis } from '../../../helper/analysationhelper';
import { UserContext } from '../../AppRouter';
import { fetchPlaylists } from '../../../services/spotifyservice';
import useDataHook from '../../../hooks/useDataHook';

function Analyze() {
  const { profile } = useContext(UserContext);
  const [activePlaylist, setActivePlaylist] = useState();
  const [analyse, setAnalyse] = useState();

  const [playlistsRequest, setPlaylistsRequest] = useState(() => () => fetchPlaylists(profile));
  const { data: playlists, isLoading, hasError } = useDataHook(playlistsRequest);

  useEffect(() => {
    setPlaylistsRequest(() => () => fetchPlaylists(profile));
  }, [profile]);

  if (hasError) return <DefaultErrorMessage />;
  if (!playlists && isLoading !== false) return <Spinner />;

  const fetchAnalyse = async playlist_id => {
    if (!playlist_id) return null;
    let analyseResponse = await getAudioAnalysis(playlist_id);
    setAnalyse(analyseResponse);
  };

  if (!playlists) return null;

  const closePlaylist = () => {
    setAnalyse(null);
    setActivePlaylist(null);
    toggleScroll();
  };

  const changePlaylist = id => {
    setActivePlaylist(id);
    setAnalyse(fetchAnalyse(id));
    toggleScroll();
  };

  const toggleScroll = () => {
    if (document.body.classList.contains('no-scroll')) {
      document.body.classList.remove('no-scroll');
      document.body.addEventListener(
        'touchmove',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
        },
        false,
      );
    } else {
      document.body.classList.add('no-scroll');
      document.body.removeEventListener(
        'touchmove',
        function (event) {
          event.preventDefault();
          event.stopPropagation();
        },
        false,
      );
    }
  };

  const renderPlaylists = () => {
    return playlists.map(playlist => {
      return Playlist(
        playlist,
        activePlaylist,
        changePlaylist,
        activePlaylist === playlist.id ? analyse : null,
        closePlaylist,
      );
    });
  };

  return (
    <div className="analyze">
      <h1>How funky are your playlists?</h1>
      <div className="analyze-content">{renderPlaylists()}</div>
    </div>
  );
}

export default Analyze;
