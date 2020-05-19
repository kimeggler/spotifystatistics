import React from 'react';
import './style.css';

function Playlist(artist, index) {
  const background = {
    backgroundImage: `url(${artist.images[0].url})`,
  };

  return (
    <div key={artist.id} className='playlist'>
      <div className='img-container'>
        {/* <img alt={artist.name} src={artist.images[0].url} className='artist-card-image' /> */}
        <div style={background} className='playlist-card-image'></div>
        <p className='playlist-rank'>Analyze</p>
      </div>
      <p className='playlist-card-name bold'>{artist.name}</p>
    </div>
  );
}

export default Playlist;
