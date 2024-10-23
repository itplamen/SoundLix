import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  Firestore,
} from "firebase/firestore";
import { getInitialData } from "./data/providers/songsDataProvider";
import { Artist, Entity, Genre, Song } from "./data/models/entities";
import { SeedRequest, SeedResponse } from "./data/models/seeds";

const options: FirebaseOptions = {
  apiKey: process.env.API_KEY,
  appId: process.env.APP_ID,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

const app = initializeApp(options);

const seed = async (): Promise<void> => {
  try {
    const db = getFirestore(app);
    const req: SeedRequest = {
      getGenres: (await getDocs(collection(db, "genres"))).empty,
      getArtists: (await getDocs(collection(db, "artists"))).empty,
      getSongs: (await getDocs(collection(db, "songs"))).empty,
    };

    const res: SeedResponse = await getInitialData(req);

    await Promise.all(createTasks<Genre>(db, res.genres, "genres"));
    await Promise.all(createTasks<Artist>(db, res.artists, "artists"));
    await Promise.all(createTasks<Song>(db, res.songs, "songs"));
  } catch (error) {
    console.log(error);
  }
};

const createTasks = <T extends Entity>(
  db: Firestore,
  entities: T[],
  collection: string
): Promise<void>[] => {
  const seedTasks = entities.map((x: Entity) => {
    const { id, ...rest }: Omit<Entity, "id"> = x;
    return setDoc(doc(db, collection, x.id.toString()), rest);
  });

  return seedTasks;
};

export default seed;
