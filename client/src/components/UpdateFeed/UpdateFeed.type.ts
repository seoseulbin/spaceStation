export type UpdateFeedType = {
  _id: string;
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
  hashtag: string[];
};
