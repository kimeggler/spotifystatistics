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
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchTopArtist = async () => {
      if (!user) return null;
      let tracks = await getData(`users/${user.id}/playlists`);
      setPlaylists(tracks.items);
    };
    fetchTopArtist();
  }, [user]);
  if (!playlists) return null;

  const renderPlaylists = () => {
    return playlists.map((playlist, index) => {
      return Playlist(playlist, index, setActivePlaylist);
    });
  };

  return (
    <div className='analyze'>
      <h1>How funky are your playlists?</h1>
      <div className='analyze-content'>{renderPlaylists()}</div>
    </div>
  );
}

export default Analyze;