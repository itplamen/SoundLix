import { db } from "@/firebase";
import { Radio, User } from "@/models/data";
import { USER_ROLE } from "@/utils/constants";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

type FilterParams = {
  filter: string;
  value: string;
};

const createUser = async (
  id: string,
  email: string,
  username: string
): Promise<void> => {
  await setDoc(doc(db, "users", id), {
    id,
    email,
    username,
    created: new Date(),
    role: USER_ROLE.USER,
  });
};

const getUser = async ({ filter, value }: FilterParams): Promise<User> => {
  const getQuery = query(collection(db, "users"), where(filter, "==", value));
  const snapshot = await getDocs(getQuery);

  if (snapshot.empty) {
    return {} as User;
  }

  return snapshot.docs[0].data() as User;
};

const getRadioList = async (): Promise<Radio[]> => {
  const querySnapshot = await getDocs(collection(db, "radio_list"));
  const radios: Radio[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return radios;
};

export { createUser, getUser, getRadioList };
