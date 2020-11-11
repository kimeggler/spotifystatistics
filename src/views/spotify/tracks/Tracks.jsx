import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import useDataHook from '../../../hooks/useDataHook';
import { getData, postData } from '../../../services/fetchservice';
import { fetchTracks } from '../../../services/spotifyservice';
import { UserContext } from '../../AppRouter';
import { DefaultErrorMessage, Spinner, Track } from '../../common';
import './style.css';

function Tracks() {
  const [showNotification, setShowNotification] = useState();
  const [timerange, setTimerange] = useState('medium_term');
  const [tracksRequest, setTracksRequest] = useState(() => () => fetchTracks(timerange));
  const { data: tracks, isLoading, hasError } = useDataHook(tracksRequest);

  const { profile } = useContext(UserContext);

  useEffect(() => {
    setTracksRequest(() => () => fetchTracks(timerange));
  }, [timerange]);

  if (hasError) return <DefaultErrorMessage />;
  if (!tracks > 0 && isLoading !== false) return <Spinner />;

  const renderTracks = () => {
    const filteredTacks = tracks.filter(track => track.name);
    return filteredTacks.map((track, index) => {
      return Track(track, index);
    });
  };

  const mapTrackUris = () => {
    return tracks.map(track => {
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

      const createdPlaylist = await postData(`users/${profile.id}/playlists`, playlist);
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

  return (
    <div className="tracks">
      <div
        onClick={() => {
          createPlaylist();
        }}
        className={`create-playlist-button ${showNotification === 'done' || showNotification === 'error' ? 'hide' : ''
          }`}
      >
        Create Playlist
      </div>
      <div className={`create-playlist-button done ${showNotification !== 'done' ? 'hide' : ''}`}>
        Done
      </div>
      <div className={`create-playlist-button error ${showNotification !== 'error' ? 'hide' : ''}`}>
        Existing
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
