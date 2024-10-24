import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { getInitialData } from "./data/providers/seedDataProvider";
import { Artist, Entity, Genre, Song } from "./data/models/entities";
import { SeedRequest, SeedResponse } from "./data/models/seeds";
import { db } from "./firebase";

const seed = async (): Promise<void> => {
  try {
    const req: SeedRequest = {
      getGenres: (await getDocs(collection(db, "genres"))).empty,
      getArtists: (await getDocs(collection(db, "artists"))).empty,
      getSongs: (await getDocs(collection(db, "songs"))).empty,
    };

    const res: SeedResponse = await getInitialData(req);

    await Promise.all(createTasks<Genre>(res.genres, "genres"));
    await Promise.all(createTasks<Artist>(res.artists, "artists"));
    await Promise.all(createTasks<Song>(res.songs, "songs"));
  } catch (error) {
    console.log(error);
  }
};

const createTasks = <T extends Entity>(
  entities: T[],
  collection: string
): Promise<void>[] => {
  const seedTasks = entities.map((x: Entity) => {
    const { id, ...rest } = x;
    return setDoc(doc(db, collection, id.toString()), rest);
  });

  return seedTasks;
};

export default seed;
