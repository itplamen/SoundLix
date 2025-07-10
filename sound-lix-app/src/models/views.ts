import { Song } from "./data";

export interface ItemDetailsView {
  id: string;
  name: string;
  image: string;
  subheading: string;
  formatInput: string;
}

export interface ArtistItemDetailsView extends ItemDetailsView {
  songs: Song[];
}

export interface SongItemDetailsView extends ItemDetailsView {
  src: string;
  downloadUrl: string;
  downloadAllowed: boolean;
  isPlaying: boolean;
  ownerId: string;
  ownerName: string;
  playedAt?: Date;
  isNew?: boolean;
  description?: string;
}
