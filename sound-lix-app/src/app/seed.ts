import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  getSongDetails,
  getTopSongIds,
} from "./data/providers/songsDataProvider";
import { Song } from "./data/models/entities";

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

async function seedSongs(): Promise<void> {
  try {
    const topSongIds: string[] = await getTopSongIds();

    const db = getFirestore(app);
    const existingSongs = await getDocs(collection(db, "songs"));

    const songDetailsTasks: Promise<Song>[] = topSongIds
      .filter((id: string) => !existingSongs.docs.map((x) => x.id).includes(id))
      .map((id: string) => {
        return getSongDetails(id);
      });

    const songs: Song[] = await Promise.all(songDetailsTasks);

    const seedTasks: Promise<void>[] = songs.map((song: Song) => {
      const { id, ...rest }: Omit<Song, "id"> = song;
      return setDoc(doc(db, "songs", song.id), rest);
    });

    await Promise.all(seedTasks);
  } catch (error) {
    console.log(error);
  }
}

export default seedSongs;
