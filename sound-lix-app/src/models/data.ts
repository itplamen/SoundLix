import { UserRole } from "@/utils/constants";

export interface Entity {
  id: string;
  name: string;
}

export interface User extends Entity {
  email: string;
  role: UserRole;
  created: Date;
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
  duration: number | string;
  released: string;
  audio: string;
  downloadUrl: string;
  image: string;
  lyrics: string;
  downloadAllowed: boolean;
  owner: Entity;
  genres: string[];
  description?: string;
  isNew?: boolean;
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

export interface Radio extends Entity {
  image: string;
  stream: string;
}
