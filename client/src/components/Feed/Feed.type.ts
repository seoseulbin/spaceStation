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
  // TODO: 위치 정보 사용시 활성화
  // geoLocation: Array<string>
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
