import { Radio } from "@/models/data";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function getRadioList(): Promise<Radio[]> {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "radio_list"));
  const radios: Radio[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return radios;
}

export default getRadioList;
