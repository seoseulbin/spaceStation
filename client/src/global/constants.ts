export const PATH = {
  root: "/",
  categoryPage: (id: string = ":id") => `/category/${id}`,
  login: "/login",
  createFeed: "/feeds/create",
  updateFeed: (id: string = ":id") => `/feeds/${id}/update`,
  profile: "/profile",
  profileUpdate: "/profile/update",
  profileSetting: "/profile/setting",
  sample: "/sample",
} as const;
