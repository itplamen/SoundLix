import { Artist, Playlist, Song } from "@/models/data";
import { ArtistResponse, PlaylistResponse, SongResponse } from "@/models/api";

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

export { mapPlaylist, mapArtist, mapSong };
