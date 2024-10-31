import { Artist, Playlist, Song } from "@/models/data";
import { ArtistResponse, PlaylistResponse, SongResponse } from "@/models/api";
import { ItemDetailsView, SongItemDetailsView } from "@/models/views";
import { formatSecondsToHours, formatSecondsToMinutes } from "./formatters";

const mapPlaylist = (from: PlaylistResponse): Playlist => {
  return {
    id: Number(from.id),
    name: from.name,
    downloadUrl: from.zip,
    songs: from.tracks.map((track: SongResponse) => mapSong(track)),
  };
};

const mapArtist = (from: ArtistResponse): Artist => {
  return {
    id: Number(from.id),
    name: from.name,
    image: from.image || from.tracks?.find((x) => x.image)?.image || "",
    joindate: from.joindate,
    website: from.website,
    songs: from.tracks.map((song: SongResponse) => mapSong(song)),
  };
};

const mapSong = (from: SongResponse): Song => {
  return {
    id: Number(from.id),
    name: from.name,
    duration: Number(from.duration),
    released: new Date(from.releasedate),
    audio: from.audio,
    rank: from.position,
    downloadUrl: from.audiodownload,
    image: from.image,
    lyrics: from.lyrics,
    downloadAllowed: from.audiodownload_allowed,
    artist: {
      id: Number(from.artist_id),
      name: from.artist_name,
      website: "",
      joindate: "",
      image: "",
    },
  };
};

const mapSongView = (from: Song): SongItemDetailsView => {
  return {
    id: from.id,
    name: from.name,
    image: from.image,
    subheading: from.artist.name,
    downloadUrl: from.downloadUrl,
    downloadAllowed: from.downloadAllowed,
    formatInput: from.duration,
    format: formatSecondsToMinutes,
  };
};

const mapArtistView = (from: Artist): ItemDetailsView => {
  return {
    id: from.id,
    name: from.name,
    image: from.image,
    subheading: `${from.songs.length} songs`,
    formatInput: from.songs
      .map((song: Song) => song.duration)
      .reduce((prev, next) => prev + next, 0),
    format: formatSecondsToHours,
  };
};

export { mapPlaylist, mapArtist, mapSong, mapSongView, mapArtistView };
