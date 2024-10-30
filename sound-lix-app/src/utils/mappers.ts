import { Playlist, Song } from "@/models/data";
import { PlaylistResponse, SongResponse } from "@/models/api";

const mapPlaylist = (from: PlaylistResponse): Playlist => {
  return {
    id: Number(from.id),
    name: from.name,
    downloadUrl: from.zip,
    songs: from.tracks.map((track: SongResponse) => mapSong(track)),
  };
};

const mapSong = (from: SongResponse): Song => {
  return {
    id: Number(from.id),
    name: from.name,
    duration: from.duration,
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
    },
  };
};

export { mapPlaylist, mapSong };
