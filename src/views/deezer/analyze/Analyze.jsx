import React, { useState, useEffect, useContext } from 'react';
import { Playlist } from '../../common';
import { getData } from '../../../services/fetchservice';

import './style.css';

function Analyze() {
  const { profile } = useContext(UserContext);
  const [playlists, setPlaylists] = useState();
  const [activePlaylist, setActivePlaylist] = useState();

  useEffect(() => {
    const fetchTopArtist = async () => {
      if (!profile) return;
      let tracks = await getData(`users/${profile.id}/playlists`);
      setPlaylists(tracks.items);
    };
    fetchTopArtist();
  }, [activePlaylist, profile]);

  if (!playlists) return null;

  const changePlaylist = index => {
    setActivePlaylist(index);
  };

  const renderPlaylists = () => {
    return playlists.map((playlist, index) => {
      return Playlist(playlist, index, activePlaylist, changePlaylist);
    });
  };

  return (
    <div className="analyze">
      <h1>How funky are your playlists?</h1>
      {renderPlaylists()}
    </div>
  );
}

export default Analyze;
