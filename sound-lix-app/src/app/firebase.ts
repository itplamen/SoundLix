import { FirebaseOptions, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

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
const db: Firestore = getFirestore(app);

export { db };
