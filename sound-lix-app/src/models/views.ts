export interface ItemDetailsView {
  id: string;
  name: string;
  image: string;
  subheading: string;
  formatInput: string;
}

export interface SongItemDetailsView extends ItemDetailsView {
  src: string;
  downloadUrl: string;
  downloadAllowed: boolean;
  isPlaying: boolean;
  isSelected: boolean;
}

export interface RoyaltyFreeMusicView extends SongItemDetailsView {
  isNew: boolean;
  description: string;
}
