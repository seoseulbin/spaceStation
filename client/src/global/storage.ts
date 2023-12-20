export const storageKeys = {
  currentUser: "currentUser",
} as const;

type StorageKeysType = keyof typeof storageKeys;

export const storage = {
  get: (key: StorageKeysType) => localStorage.getItem(key),
  set: (key: StorageKeysType, value: string) =>
    localStorage.setItem(key, value),
  remove: (key: StorageKeysType) => localStorage.removeItem(key),
};
