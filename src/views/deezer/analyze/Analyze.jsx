import React, { useState, useEffect } from 'react';
import './style.css';
import { Playlist } from '../../common';
import { getData } from '../../../services/fetchservice';

function Analyze() {
  const [user, setUser] = useState();
  const [playlists, setPlaylists] = useState();
  const [activePlaylist, setActivePlaylist] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      // You can await here
      setUser(await getData('me'));
      // ...
    };
    const fetchTopArtist = async () => {
      fetchUser();
      if (!user) return;
      let tracks = await getData(`users/${user.user.id}/playlists`);
      setPlaylists(tracks.items);
    };
    fetchTopArtist();
  }, [activePlaylist, user]);
  if (!playlists) return null;

  const renderPlaylists = () => {
    return playlists.map((playlist, index) => {
      return Playlist(playlist, index, setActivePlaylist);
    });
  };

  return (
    <div className='analyze'>
      <h1>How funky are your playlists?</h1>
      {renderPlaylists()}
    </div>
  );
}

export default Analyze;
