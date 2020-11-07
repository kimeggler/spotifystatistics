const mapGenres = (topGenres) => {

  return Array.from(new Set(topGenres))
    .map(genre => ({ name: genre, count: topGenres.filter(g => g === genre).length }))
    .sort((a, b) => b.count - a.count)
    .filter(genre => genre.count > 1)
    .slice(0, 50);
}


export const calcTopGenres = (topArtists) => {
  const topGenres = topArtists.map(artist => artist.genres).flat();

  return mapGenres(topGenres);
}

export const calcTopGenresIncludingArtists = (topArtists) => {
  const topGenres = topArtists.map((artist, index) => {
    const multiplier = Math.abs(Math.ceil((index + 1) / (topArtists.length / 5)) - 6);
    let arrayToReturn = [];
    for (let i = 0; i < multiplier; i++) {
      arrayToReturn.push(...artist.genres);
    }
    return arrayToReturn;
  }).flat();

  return mapGenres(topGenres);
}