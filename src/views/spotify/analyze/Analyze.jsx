import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { DefaultErrorMessage, Playlist, Spinner } from '../../common';
// import { getAudioAnalysis } from '../../../helper/analysationhelper';
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

  // useEffect(() => {
  //   const fetchAnalyse = async () => {
  //     if (!activePlaylist) return null;
  //     let analyseResponse = await getAudioAnalysis(activePlaylist);
  //     setAnalyse(analyseResponse);
  //   };
  //   fetchAnalyse();
  // }, [activePlaylist]);

  if (!playlists) return null;

  const changePlaylist = id => {
    setActivePlaylist(id);
    setAnalyse(null);
  };

  const renderPlaylists = () => {
    return playlists.map(playlist => {
      return Playlist(
        playlist,
        activePlaylist,
        changePlaylist,
        activePlaylist === playlist.id ? analyse : null,
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
