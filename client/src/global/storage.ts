export const storageKeys = {
  currentUser: "currentUser",
  temp: "temp",
} as const;

type StorageKeysType = keyof typeof storageKeys;

type StorageValuesType = {
  currentUser: {
    userId: string;
    nickname: string;
  };
  temp: string;
};

export const storage = {
  get: <T extends StorageKeysType>(key: T): StorageValuesType[T] | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  },
  set: <T extends StorageKeysType>(key: T, value: StorageValuesType[T]) => {
    if (value !== null && typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }
    localStorage.setItem(key, value);
  },
  remove: (key: StorageKeysType) => localStorage.removeItem(key),
};
