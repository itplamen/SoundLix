export interface ItemDetailsView {
  id: string;
  name: string;
  image: string;
  subheading: string;
  formatInput: string;
}

export interface ArtistItemDetailsView extends ItemDetailsView {
  songs: SongItemDetailsView[];
}

export interface SongItemDetailsView extends ItemDetailsView {
  src: string;
  downloadUrl: string;
  downloadAllowed: boolean;
  isPlaying: boolean;
  ownerId: string;
  ownerName: string;
}

export interface RoyaltyFreeMusicView extends SongItemDetailsView {
  isNew: boolean;
  description: string;
}
