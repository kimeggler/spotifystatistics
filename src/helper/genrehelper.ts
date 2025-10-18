import { SpotifyArtist } from '../types/spotify';

// Interface for genre data
interface GenreData {
  name: string;
  count: number;
}

const mapGenres = (topGenres: string[], includedArtistRanking: boolean = false): GenreData[] => {
  const uniqueGenres = Array.from(new Set(topGenres));
  
  return uniqueGenres
    .map(genre => ({
      name: genre,
      count: topGenres.filter(g => g === genre).length
    }))
    .sort((a, b) => b.count - a.count)
    .filter(genre => genre.count > (includedArtistRanking ? 2 : 1))
    .slice(0, 50);
};

export const calcTopGenres = (topArtists: SpotifyArtist[]): GenreData[] => {
  if (!topArtists || topArtists.length === 0) {
    return [];
  }
  
  const topGenres = topArtists
    .map(artist => artist.genres || [])
    .flat()
    .filter(genre => genre); // Filter out empty strings or null values

  return mapGenres(topGenres);
};

export const calcTopGenresIncludingArtists = (topArtists: SpotifyArtist[]): GenreData[] => {
  if (!topArtists || topArtists.length === 0) {
    return [];
  }
  
  const topGenres = topArtists
    .map((artist, index) => {
      const multiplier = Math.abs(Math.ceil((index + 1) / (topArtists.length / 5)) - 6);
      const genres = artist.genres || [];
      let arrayToReturn: string[] = [];
      
      for (let i = 0; i < multiplier; i++) {
        arrayToReturn.push(...genres);
      }
      
      return arrayToReturn;
    })
    .flat()
    .filter(genre => genre); // Filter out empty strings or null values

  return mapGenres(topGenres, true);
};

export type { GenreData };