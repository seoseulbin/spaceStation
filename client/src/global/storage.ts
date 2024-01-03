export const storageKeys = {
  currentUser: "currentUser",
  temp: "temp",
  geoLocation: "geoLocation",
  hasSeenSplash: "hasSeenSplash",
  tagInfo: "tagInfo",
} as const;

type StorageKeysType = keyof typeof storageKeys;

type StorageValuesType = {
  currentUser: {
    userId: string;
    nickname: string;
  };
  temp: string;
  hasSeenSplash: string;
  geoLocation: {
    content: string;
    position: {
      lng: number;
      lat: number;
    };
  };
  tagInfo: {
    name: string;
    url: string;
  };
};

export const storage = {
  get: <T extends StorageKeysType>(key: T): StorageValuesType[T] | null => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch {
      return item as StorageValuesType[T];
    }
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
