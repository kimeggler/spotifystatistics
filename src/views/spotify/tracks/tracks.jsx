import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getData, postData } from '../../../services/fetchservice';
import { Track } from '../../common';
import './style.css';

function Tracks() {
  const [showNotification, setShowNotification] = useState();
  const [toptracks, setToptracks] = useState();
  const [timerange, setTimerange] = useState('medium_term');
  useEffect(() => {
    const fetchTopArtist = async () => {
      let tracks = await getData('me/top/tracks', {}, `?time_range=${timerange}&limit=50`);
      setToptracks(tracks.items);
    };
    fetchTopArtist();
  }, [timerange]);
  const mapTrackUris = () => {
    return toptracks.map(track => {
      return track.uri;
    });
  };

  const createPlaylist = async () => {
    const playlists = await getData('me/playlists');
    const date = moment(new Date()).format('DD-MM-YYYY');
    const timeRange =
      timerange === 'long_term'
        ? 'All time'
        : timerange === 'medium_term'
        ? 'Last 6 months'
        : 'Last month';
    const playlistName = timeRange + ' favorites - ' + date;
    const filteredPlaylists = playlists.items.filter(playlist => playlist.name === playlistName);

    if (filteredPlaylists.length === 0) {
      const playlist = JSON.stringify({
        name: playlistName,
        public: false,
      });
      const tracks = JSON.stringify({
        uris: mapTrackUris(),
      });
      const user = await getData('me');
      const createdPlaylist = await postData(`users/${user.id}/playlists`, playlist);
      const response = await postData(`playlists/${createdPlaylist.id}/tracks`, tracks);

      setShowNotification('done');
      setTimeout(() => {
        setShowNotification('none');
      }, 1000);

      return response;
    }
    setShowNotification('error');
    setTimeout(() => {
      setShowNotification('none');
    }, 1000);

    return false;
  };
  if (!toptracks) return null;

  const renderTracks = () => {
    return toptracks.map((track, index) => {
      return Track(track, index);
    });
  };

  return (
    <div className="tracks">
      <div
        onClick={() => {
          createPlaylist();
        }}
        className={`create-playlist-button ${
          showNotification === 'done' || showNotification === 'error' ? 'hide' : ''
        }`}
      >
        Create Playlist
      </div>
      <div className={`create-playlist-button done ${showNotification !== 'done' ? 'hide' : ''}`}>
        Done
      </div>
      <div className={`create-playlist-button error ${showNotification !== 'error' ? 'hide' : ''}`}>
        Already exists
      </div>

      <h1 className="site-title">Favourite Tracks</h1>
      <div className="time-switch time-switch-detail time-switch-tracks">
        <div
          onClick={() => {
            setTimerange('short_term');
          }}
          className={`time-button ${timerange === 'short_term' ? 'button-selected' : ''}`}
        >
          1 month
        </div>
        <div
          onClick={() => {
            setTimerange('medium_term');
          }}
          className={`time-button ${timerange === 'medium_term' ? 'button-selected' : ''}`}
        >
          6 months
        </div>
        <div
          onClick={() => {
            setTimerange('long_term');
          }}
          className={`time-button ${timerange === 'long_term' ? 'button-selected' : ''}`}
        >
          all time
        </div>
      </div>
      <div className="tracks-content">{renderTracks()}</div>
    </div>
  );
}

export default Tracks;
