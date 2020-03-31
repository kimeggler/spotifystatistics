import React, { useEffect, useState } from 'react';
import { getData } from '../../../services/fetchservice';

function ArtistTop() {
  const [topartist, setTopartist] = useState();
  useEffect(() => {
    const fetchTopArtist = async () => {
      let artist = await getData('me/top/artists', {}, '?limit=1');
      setTopartist(artist.items[0]);
    };
    fetchTopArtist();
  }, []);
  if (topartist === undefined) {
    return null;
  }
  return (
    <div className='artist-top'>
      <div className='top-card-background' />
      <p className='image-description text-background'>Dein Top-Artist</p>
      <p className='image-description bold artist-name text-background'>{topartist.name}</p>
      <p className='image-description follower-count text-background'>{topartist.followers.total}</p>
      <img alt={topartist.name} src={topartist.images[0].url} className='card-image' />
    </div>
  );
}

export default ArtistTop;
