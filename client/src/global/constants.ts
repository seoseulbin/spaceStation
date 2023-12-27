export const PATH = {
  root: "/",

  login: "/login",

  category: (categeryId: string) => `/category/${categeryId}`,

  categoryDetail: (categeryId: string, cursor: string) =>
    `/category/${categeryId}/cursor/${cursor}`,

  createFeed: "/feeds/create",

  updateFeed: (id: string = ":id") => `/feeds/${id}/update`,

  profile: "/profile",

  profileFeedDetail: (userId: string, cursor: string) =>
    `/profile/${userId}/cursor/${cursor}`,

  profileUpdate: "/profile/update",

  profileSetting: "/profile/setting",

  bookmarkFeedDetail: (cursor: string) => `/bookmark/cursor/${cursor}`,

  sample: "/sample",
} as const;

export const FEED_COLUMN = {
  category: 2,
  profile: 3,
  bookmark: 3,
} as const;
