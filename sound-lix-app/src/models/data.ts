export interface Entity {
  id: number;
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
