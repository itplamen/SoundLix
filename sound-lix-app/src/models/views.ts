export interface ItemDetailsView {
  id: string;
  name: string;
  image: string;
  subheading: string;
  formatInput: string;
  format: (seconds: string) => string;
}

export interface SongItemDetailsView extends ItemDetailsView {
  downloadUrl: string;
  downloadAllowed: boolean;
}

export interface RoyaltyFreeMusicView extends SongItemDetailsView {
  isNew: boolean;
  description: string;
}

export type IconTypeView = {
  heading: string;
};
