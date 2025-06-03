import { Player, Radio } from "@/models/data";
import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { db } from "@/firebase";

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

const createPlayer = async (player: Player): Promise<void> => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, "test@aa.dd", "qeqeqe121QWe@")
    .then((userCredential) => {
      const user = userCredential.user;
      const savePlayer = async (user: User) => {
        await setDoc(doc(db, "players", user.uid), {
          ...player,
          id: user.uid,
          created: new Date(),
        });
      };

      savePlayer(user);
    })
    .catch((error) => {
      console.error(error.code, error.message);
    });
};

const getPlayer = async (email: string) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, "test@aa.dd", "qeqeqe121QWe@")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const q = 1;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  const q = query(collection(db, "players"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return snapshot.docs[0].data();
};

const getRadioList = async (): Promise<Radio[]> => {
  const querySnapshot = await getDocs(collection(db, "radio_list"));
  const radios: Radio[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return radios;
};

export { createPlayer, getPlayer, getRadioList };
