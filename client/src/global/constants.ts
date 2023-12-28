export const PATH = {
  root: "/",

  login: "/login",

  category: (categeryId: string) => `/category/${categeryId}`,
  categoryDetail: (categeryId: string, cursor: string) =>
    `/category/${categeryId}/cursor/${cursor}`,

  createFeed: "/feeds/create",
  updateFeed: (id: string) => `/feeds/${id}/update`,

  profile: "/profile",
  profileFeedDetail: (userId: string, cursor: string) =>
    `/profile/${userId}/cursor/${cursor}`,
  profileUpdate: "/profile/update",
  profileSetting: "/profile/setting",

  bookmarkFeedDetail: (cursor: string) => `/bookmark/cursor/${cursor}`,

  search: (query?: string, scope: "feed" | "account" | "tag" = "feed") =>
    `/search${query ? `?query=${query}&scope=${scope}` : ""}`,
  searchFeedDetail: (query: string, cursor: string) =>
    `/feeds/search/${query}/cursor/${cursor}`,

  hashtagFeedOverview: (hashtag: string) => `/feeds/hashtag/${hashtag}`,
  hashtagFeedDetail: (hashtag: string, cursor: string) =>
    `/feeds/hashtag/${hashtag}/cursor/${cursor}`,
} as const;

export const FEED_COLUMN = {
  category: 2,
  profile: 3,
  bookmark: 3,
  search: 3,
} as const;

export const SEARCH_SCOPE = {
  FEED: "feed",
  ACCOUNT: "account",
  TAG: "tag",
} as const;

export type SearchScopeType = (typeof SEARCH_SCOPE)[keyof typeof SEARCH_SCOPE];
