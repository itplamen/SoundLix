import { Artist, Playlist, RoyaltyFreeMusic, Song } from "@/models/data";
import { ArtistResponse, PlaylistResponse, SongResponse } from "@/models/api";
import {
  ItemDetailsView,
  RoyaltyFreeMusicView,
  SongItemDetailsView,
} from "@/models/views";
import {
  formatSecondsToHours,
  formatSecondsToMinutes,
  formatTime,
} from "./formatters";

export const mapPlaylist = (from: PlaylistResponse): Playlist => {
  const tracks = from.tracks.sort(
    (a: SongResponse, b: SongResponse) => a.position - b.position
  );
  return {
    id: from.id,
    name: from.name,
    downloadUrl: from.zip,
    created: from.creationdate,
    image: tracks[0].image,
    songs: tracks.map((track: SongResponse) => mapSong(track)),
  };
};

export const mapArtist = (from: ArtistResponse): Artist => {
  return {
    id: from.id,
    name: from.name,
    image: from.image || from.tracks?.find((x) => x.image)?.image || "",
    joindate: from.joindate,
    website: from.website,
    songs: from.tracks.map((song: SongResponse) => mapSong(song)),
  };
};

export const mapSong = (from: SongResponse): Song => {
  return {
    id: from.id,
    name: from.name,
    duration: Number(from.duration),
    released: from.releasedate,
    audio: from.audio,
    rank: from.position,
    downloadUrl: from.audiodownload,
    image: from.image,
    lyrics: from.lyrics,
    downloadAllowed: from.audiodownload_allowed,
    artist: {
      id: from.artist_id,
      name: from.artist_name,
      website: "",
      joindate: "",
      image: "",
    },
    genres: from.musicinfo?.tags?.genres ?? [],
  };
};

export const mapSongView = (from: Song): SongItemDetailsView => {
  return {
    id: from.id,
    name: from.name,
    src: from.audio,
    image: from.image,
    subheading: from.artist.name,
    downloadUrl: from.downloadUrl,
    downloadAllowed: from.downloadAllowed,
    formatInput: formatSecondsToMinutes(from.duration.toString()),
  };
};

export const mapRoyalty = (from: RoyaltyFreeMusic): RoyaltyFreeMusicView => {
  return {
    id: from.id,
    name: from.name,
    isNew: from.isNew,
    image: from.image,
    subheading: from.composer,
    formatInput: formatTime(from.duration),
    description: from.description,
    downloadAllowed: true,
    downloadUrl: from.audio,
  };
};

export const mapArtistView = (from: Artist): ItemDetailsView => {
  return {
    id: from.id,
    name: from.name,
    image: from.image,
    subheading: `${from.songs.length} songs`,
    formatInput: formatSecondsToHours(mapTotalDuration(from.songs)),
  };
};

export const mapTotalDuration = (songs: Song[]): string => {
  return songs
    .map((song: Song) => song.duration)
    .reduce((prev, next) => prev + next, 0)
    .toString();
};
