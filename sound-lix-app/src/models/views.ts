export interface ItemDetailsView {
  id: number;
  name: string;
  image: string;
  subheading: string;
  formatInput: number;
  format: (seconds: number) => string;
}

export interface SongItemDetailsView extends ItemDetailsView {
  downloadUrl: string;
  downloadAllowed: boolean;
}

export type IconTypeView = {
  heading: string;
};
