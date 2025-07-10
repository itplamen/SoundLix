import * as cheerio from "cheerio";

import { ApiRequest, ApiResponse, RoyaltyFreeMusicRequest } from "@/models/api";

import { fetchData } from "@/api/fetchApi";
import { Song } from "@/models/data";

const getRoyaltyFreeMusic = async (): Promise<Song[]> => {
  const request: ApiRequest<RoyaltyFreeMusicRequest> = {
    baseUrl: process.env.ROYALTY_FREE_MUSIC_URL,
    queryParams: {
      client_id: process.env.CLIENT_ID,
      type: "free",
      sort: "date_available",
    },
  };
  const response: ApiResponse<string> = await fetchData(request);

  const $ = cheerio.load(response.results[0]);
  const map = new Map<string, boolean>();

  $("div.grid-container.result-container.px-5").each((_, element) => {
    const split: string[] | undefined = $(element)
      ?.find("a.has-text-black")
      ?.attr("href")
      ?.split("/");

    const id: string = (split && split[split.length - 1]) ?? "";
    if (id) {
      const isNew: boolean = $(element).find("div.new-track.ml-2").length > 0;
      map.set(id, isNew);
    }
  });

  const tasks: Promise<Song>[] = Array.from(map.keys()).map((id: string) => {
    return getDetails(id);
  });

  const details: Song[] = await Promise.all(tasks);
  const music: Song[] = details.map((item: Song) => {
    return {
      ...item,
      isNew: Boolean(map.get(item.id)),
    };
  });

  return music;
};

const getDetails = async (id: string): Promise<Song> => {
  const request: ApiRequest<RoyaltyFreeMusicRequest> = {
    baseUrl: `${process.env.ROYALTY_FREE_MUSIC_URL}\track\\${id}`,
    queryParams: {
      client_id: process.env.CLIENT_ID,
    },
  };

  const response: ApiResponse<string> = await fetchData(request);
  const $ = cheerio.load(response.results[0]);

  return {
    id: id,
    name: $("div#music-download").attr("data-track-name") ?? "",
    duration: $("div.is-flex.is-hidden-mobile.details")
      .first()
      .find("span")
      .first()
      .text(),
    audio: `${process.env.ROYALTY_FREE_MUSIC_AUDIO_URL}${$(
      "div#music-download"
    ).attr("data-model")}.mp3`,
    image: $("div#product-picture").first().find("img").attr("src") ?? "",
    owner: {
      id: "",
      name: $("div#music-download").attr("data-composer-name") ?? "",
    },
    description: $("div.is-hidden-mobile.description").first().text().trim(),
    isNew: true, // TODO:
    released: "",
    downloadUrl: "",
    downloadAllowed: true,
    lyrics: "",
    genres: [],
  };
};

export { getRoyaltyFreeMusic };
