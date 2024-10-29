export interface Entity {
  id: number;
  name: string;
}

export interface Playlist extends Entity {
  downloadUrl: string;
  songs: Song[];
}

export interface Artist extends Entity {}

export interface Song extends Entity {
  duration: number;
  released: Date;
  audio: string;
  downloadUrl: string;
  image: string;
  lyrics: string;
  downloadAllowed: boolean;
  artist: Artist;
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
