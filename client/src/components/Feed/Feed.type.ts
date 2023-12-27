export type FeedType = {
  _id: string;
  userId: string;
  comments: Array<string>;
  category: string;
  imgUrls: Array<{
    url: string;
    tagPosition: Array<{
      x: number;
      y: number;
    }>;
    tagInfo: Array<{
      name: string;
      url: string;
    }>;
  }>;
  content: string;
  createdAt: Date;
  hashtag?: string[];
  geoLocation: {
    content: string;
    position: {
      lat: number;
      lng: number;
    };
  };
};

export type FeedInifiteQueryHookType = {
  pages: {
    data: FeedType[];
    nextCursor: number;
  }[];
  hasNextPage: boolean;
  setTarget: React.Dispatch<
    React.SetStateAction<HTMLElement | null | undefined>
  >;
};
