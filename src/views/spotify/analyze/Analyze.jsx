import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { Playlist } from '../../common';
import { getData } from '../../../services/fetchservice';
import { getAudioAnalysis } from '../../../helper/analysationhelper';
import { UserContext } from '../../AppRouter';

function Analyze() {
  const { profile } = useContext(UserContext);
  const [playlists, setPlaylists] = useState();
  const [activePlaylist, setActivePlaylist] = useState();
  const [analyse, setAnalyse] = useState();

  useEffect(() => {
    const fetchTopArtist = async () => {
      let tracks = await getData(`users/${profile.id}/playlists`, null, '?limit=50');
      setPlaylists(tracks.items);
    };
    fetchTopArtist();
  }, [profile]);

  useEffect(() => {
    const fetchAnalyse = async () => {
      if (!activePlaylist) return null;
      let analyseResponse = await getAudioAnalysis(activePlaylist);
      setAnalyse(analyseResponse);
    };
    fetchAnalyse();
  }, [activePlaylist]);

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
