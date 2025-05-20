import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const isServer = typeof window === "undefined";

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage = isServer ? createNoopStorage() : createWebStorage("local");

export default storage;
