import { atom, selector } from "recoil";
import { GeoLocationType } from "@/global/types/GeoLocation";

export const geoLocationAtom = atom<GeoLocationType>({
  key: "geoLocation",
  default: {
    content: "",
    position: {
      lat: 0,
      lng: 0,
    },
  },
});

export const geoLocationContent = selector({
  key: "geoLocationAtomContent",
  get: ({ get }) => {
    const geoLocation = get(geoLocationAtom);

    return geoLocation.content;
  },
});

export const geoLocationMarkerAtom = atom<GeoLocationType>({
  key: "geoLocationMarker",
  default: {
    content: "",
    position: {
      lat: 0,
      lng: 0,
    },
  },
});
