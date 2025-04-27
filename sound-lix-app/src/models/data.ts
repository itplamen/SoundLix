export interface Entity {
  id: string;
  name: string;
}

export interface Playlist extends Entity {
  downloadUrl: string;
  created: string;
  image: string;
  songs: Song[];
}

export interface Artist extends Entity {
  website: string;
  joindate: string;
  image: string;
  songs: Song[];
}

export interface Song extends Entity {
  duration: number;
  released: string;
  audio: string;
  rank: number;
  downloadUrl: string;
  image: string;
  lyrics: string;
  downloadAllowed: boolean;
  artist: Artist;
  genres: string[];
}

export const GenreType = {
  Pop: "Pop",
  Rock: "Rock",
  Electronic: "Electronic",
  HipHop: "HipHop",
  Jazz: "Jazz",
  Indie: "Indie",
  Filmscore: "Filmscore",
  Classical: "Classical",
  Chillout: "Chillout",
  Ambient: "Ambient",
  Folk: "Folk",
  Metal: "Metal",
  Latin: "Latin",
  RNB: "RNB",
  Reggae: "Reggae",
  Punk: "Punk",
  Country: "Country",
  House: "House",
  Blues: "Blues",
} as const;

type GenreKey = (typeof GenreType)[keyof typeof GenreType];
export type Genre = GenreKey;
