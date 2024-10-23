import axios from "axios";
import * as cheerio from "cheerio";
import { Artist, Genre, Song } from "../models/entities";
import { SeedRequest, SeedResponse } from "../models/seeds";

const SUCCESS_STATUS: number = 200;

type SongGenreMap = {
  songId: number;
  genreId: number;
};

const getInitialData = async (req: SeedRequest): Promise<SeedResponse> => {
  const response = await axios.get(process.env.INITIAL_DATA_URL);
  if (response.status !== SUCCESS_STATUS) {
    throw Error("Could not get initial seed data!");
  }

  const $ = cheerio.load(response.data);

  return {
    genres: req.getGenres ? getGenres($) : [],
    artists: req.getArtists ? getArtists($) : [],
    songs: req.getSongs ? await getSongs($) : [],
  };
};

const getGenres = ($: cheerio.CheerioAPI): Genre[] => {
  const genres: Genre[] = [];

  $("div#filter-genres div.c-checkbox").each((_, element) => {
    const genre: Genre = {
      id: Number($(element).find('input[type="checkbox"]').val()),
      name: $(element).find("label span:last-child").text().trim(),
    };

    genres.push(genre);
  });

  return genres;
};

const getArtists = ($: cheerio.CheerioAPI): Artist[] => {
  const artists: Artist[] = [];

  $("div#search-results table tbody tr").each((_, element) => {
    const split: string[] =
      $(element).find("div.c-visual img").attr("src")?.split("/") ?? [];

    const artist: Artist = {
      id: Number($(element).attr("data-profile-id")),
      name: $(element).find("a.c-song__artist").text().trim(),
      pic: split.includes($(element).attr("data-profile-id") ?? "")
        ? split.at(-1) ?? ""
        : "",
    };

    if (!artists.find((x) => x.id === artist.id)) {
      artists.push(artist);
    }
  });

  return artists;
};

const getSongs = async ($: cheerio.CheerioAPI): Promise<Song[]> => {
  const songs: Song[] = [];

  $("div#search-results table tbody tr").each((_, element) => {
    const song: Song = {
      id: Number($(element).attr("data-song-id")),
      title: $(element).find("div.c-song__title").text().trim(),
      artistId: Number($(element).attr("data-profile-id")),
      genreId: 0,
      time: $(element).find("td.show-for-large:first").text().trim(),
      isFeatured: $(element).hasClass("is-featured"),
    };

    songs.push(song);
  });

  const songGenreMaps = await Promise.all(
    songs.map((song: Song) => {
      return getSongGenreId(song.id);
    })
  );

  songs.forEach((element: Song, index) => {
    const song: Song = { ...element };
    song.genreId =
      songGenreMaps.find((map: SongGenreMap) => map.songId === song.id)
        ?.genreId ?? 0;

    songs[index] = song;
  });

  return songs;
};

const getSongGenreId = async (songId: number): Promise<SongGenreMap> => {
  try {
    const response = await axios.get(
      `${process.env.SONG_GENRE_ID_URL}/${songId}`,
      {
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
      }
    );

    const url = new URL(response.headers.location);
    const params = new URLSearchParams(url.search);
    const genres = params.getAll("genres[]");

    return { songId, genreId: Number(genres[0]) };
  } catch (error) {
    console.log(`Could not get genre for songId: ${songId}`, error);
    return { songId, genreId: 0 };
  }
};

export { getInitialData };
