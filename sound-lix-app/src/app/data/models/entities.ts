export interface Entity {
  id: number;
}

export interface Genre extends Entity {
  name: string;
}

export interface Artist extends Entity {
  name: string;
  pic: string;
}

export interface Song extends Entity {
  title: string;
  artistId: number;
  genreId: number;
  time: string;
  isFeatured: boolean;
}
