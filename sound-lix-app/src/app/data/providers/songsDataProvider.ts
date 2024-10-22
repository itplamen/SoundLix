import axios from "axios";
import * as cheerio from "cheerio";
import { Song } from "../models/entities";

const success: number = 200;

const getTopSongIds = async (): Promise<Array<string>> => {
  const response = await axios.get(process.env.TOP_SONGS_URL);

  if (response.status !== success) {
    throw Error("Could not get top songs!");
  }

  const $ = cheerio.load(response.data);
  const set = new Set<string>();

  $('a[title="View song details"]').each((_, element) => {
    const id: string = $(element).attr("href")?.split("?sid=")?.at(-1) ?? "";
    if (id) {
      set.add(id);
    }
  });

  return Array.from(set.values());
};

const getSongDetails = async (id: string): Promise<Song> => {
  const response = await axios.get(`${process.env.SONG_DETAILS_URL}${id}`);

  if (response.status !== success) {
    throw Error(`Could not get song with ID: ${id}!`);
  }

  const $ = cheerio.load(response.data);

  return {
    id,
    title: $("h1.song_head_song").text(),
    artist: $("div.top40_h1title_sub").text().trim(),
    lyrics: $("div.translate").text(),
    url: $("div#v_player").attr("data-plyr-embed-id")?.toString() ?? "",
  };
};

export { getTopSongIds, getSongDetails };
