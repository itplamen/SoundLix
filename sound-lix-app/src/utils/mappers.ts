import { Artist, Playlist, RoyaltyFreeMusic, Song } from "@/models/data";
import { ArtistResponse, PlaylistResponse, SongResponse } from "@/models/api";
import {
  ArtistItemDetailsView,
  RoyaltyFreeMusicView,
  SongItemDetailsView,
} from "@/models/views";
import { formatSecondsToHours, formatTime } from "./formatters";

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
    songs: tracks.map((track: SongResponse) => {
      return {
        ...mapSong(track),
        owner: {
          id: from.id,
          name: from.name,
        },
      };
    }),
  };
};

export const mapArtist = (from: ArtistResponse): Artist => {
  const artist: Artist = {
    id: from.id,
    name: from.name,
    image: from.image || from.tracks?.find((x) => x.image)?.image || "",
    joindate: from.joindate,
    website: from.website,
    songs: [],
  };

  const songs: Song[] = from.tracks
    .map((song: SongResponse) => {
      return {
        ...mapSong(song),
        artist: {
          id: artist.id,
          name: artist.name,
        },
      };
    })
    .sort((a: Song, b: Song) => a.id.localeCompare(b.id));
  return {
    ...artist,
    songs,
  };
};

export const mapSong = (from: SongResponse): Song => {
  return {
    id: from.id,
    name: from.name,
    duration: Number(from.duration),
    released: from.releasedate,
    audio: from.audio,
    downloadUrl: from.audiodownload,
    image: from.image,
    lyrics: from.lyrics,
    downloadAllowed: from.audiodownload_allowed,
    owner: {
      id: from.artist_id,
      name: from.artist_name,
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
    isPlaying: false,
    subheading: from.owner.name,
    ownerId: from.owner.id,
    ownerName: from.owner.name,
    downloadUrl: from.downloadUrl,
    downloadAllowed: from.downloadAllowed,
    formatInput: formatTime(from.duration),
  };
};

export const mapRoyalty = (from: RoyaltyFreeMusic): RoyaltyFreeMusicView => {
  return {
    id: from.id,
    name: from.name,
    isNew: from.isNew,
    image: from.image,
    subheading: from.composer,
    ownerId: from.id,
    ownerName: from.composer,
    src: from.audio,
    formatInput: from.duration,
    description: from.description,
    downloadAllowed: true,
    downloadUrl: from.audio,
    isPlaying: false,
  };
};

export const mapArtistView = (from: Artist): ArtistItemDetailsView => {
  return {
    id: from.id,
    name: from.name,
    image: from.image,
    subheading: `${from.songs.length} songs`,
    formatInput: formatSecondsToHours(mapTotalDuration(from.songs)),
    songs: from.songs.map((song: Song) => {
      return {
        ...mapSongView(song),
        ownerId: from.id,
        ownerName: from.name,
      };
    }),
  };
};

export const mapTotalDuration = (songs: Song[]): string => {
  return songs
    .map((song: Song) => song.duration)
    .reduce((prev, next) => prev + next, 0)
    .toString();
};
