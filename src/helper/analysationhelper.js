import { getData } from '../services/fetchservice';

const getAudioAnalysis = async playlist_id => {
  const songs_ids = await getSongs(playlist_id);
  const songs_audio_features = await getSongFeatures(songs_ids);
  return formatData(songs_audio_features);
};

const getSongs = async playlist_id => {
  const songs = await getData(`playlists/${playlist_id}/tracks`, null, '?field=items(id)');
  return songs.items.map(song => song.track.id);
};

const getSongFeatures = async ids => {
  const id_string = ids.reduce((prev, curr, i) => {
    return prev + curr + (i === ids.length - 1 ? '' : ',');
  }, '');
  return await getData('audio-features', null, `?ids=${id_string}`).then(
    result => result.audio_features,
  );
};

const addData = (prev, curr) => {
  prev.danceability += curr.danceability;
  prev.energy += curr.energy;
  prev.speechiness += curr.speechiness;
  prev.acousticness += curr.acousticness;
  prev.instrumentalness += curr.instrumentalness;
  prev.liveness += curr.liveness;
  prev.valence += curr.valence;
  prev.tempo += curr.tempo;
  prev.duration_ms += curr.duration_ms;
  return prev;
};

const divideData = (prev, count) => {
  prev.danceability /= count;
  prev.energy /= count;
  prev.speechiness /= count;
  prev.acousticness /= count;
  prev.instrumentalness /= count;
  prev.liveness /= count;
  prev.valence /= count;
  prev.tempo /= count;
  prev.duration = prev.duration_ms / 1000 / count;
  prev.playlist_duration = prev.duration_ms / 1000;
  prev.playlist_length = count;
  prev.id = 'analysis';
  return prev;
};

const getPercentageandCrop = analysis => {
  const series = [];
  series.push({ name: 'Acousticness', value: Math.round((analysis.acousticness *= 100)) });
  series.push({ name: 'Danceability', value: Math.round((analysis.danceability *= 100)) });
  series.push({ name: 'Energy', value: Math.round((analysis.energy *= 100)) });
  series.push({ name: 'Instrumentalness', value: Math.round((analysis.instrumentalness *= 100)) });
  series.push({ name: 'Liveness', value: Math.round((analysis.liveness *= 100)) });
  series.push({ name: 'Speechiness', value: Math.round((analysis.speechiness *= 100)) });
  series.push({ name: 'Happiness', value: Math.round((analysis.valence *= 100)) });
  // series.push(Math.round(analysis.tempo));
  return series;
};

const formatData = songs => {
  if (songs[0] === null) {
    return {
      empty: true,
    };
  }
  const playlist_analysis = songs.reduce((prev, curr, i) => {
    return i === songs.length - 1 ? divideData(prev, songs.length) : addData(prev, curr);
  });
  return getPercentageandCrop(playlist_analysis);
};

export { getAudioAnalysis };
