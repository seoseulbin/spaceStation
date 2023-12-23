export const PATH = {
  root: "/",
  login: "/login",
  category: (id: string = ":id") => `/category/${id}`,
  createFeed: "/feeds/create",
  updateFeed: (id: string = ":id") => `/feeds/${id}/update`,
  profile: "/profile",
  profileUpdate: "/profile/update",
  profileSetting: "/profile/setting",
  sample: "/sample",
} as const;
