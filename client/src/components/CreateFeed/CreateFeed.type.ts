export type CreateFeedType = {
  category: string;
  imgUrls: {
    url: string;
    tagPosition: {
      x: number;
      y: number;
    }[];
    tagInfo: {
      name: string;
      url: string;
    }[];
  }[];
  content: string;
  hashtag: string;
  geoLocation: {
    content: string;
    position: {
      lat: number;
      lng: number;
    };
  };
};
