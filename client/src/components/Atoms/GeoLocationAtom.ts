import { atom } from "recoil";
import { GeoLocationType } from "@/global/types/geoLocation";

export const geoLocationAtom = atom<GeoLocationType>({
  key: "geoLocation",
  default: {
    content: undefined,
    position: {
      lat: undefined,
      lng: undefined,
    },
  },
});
