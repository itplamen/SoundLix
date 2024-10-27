import { Artist, Genre, Song } from "./entities";

export type SeedRequest = {
  getGenres: boolean;
  getArtists: boolean;
  getSongs: boolean;
};

export type SeedResponse = {
  genres: Genre[];
  artists: Artist[];
  songs: Song[];
};
