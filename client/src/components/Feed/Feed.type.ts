export type FeedType = {
  _id: string;
  userId: string;
  comments: Array<string>;
  category: string;
  imgUrls: Array<string>;
  content: string;
  createdAt: Date;
  // TODO: 위치 정보 사용시 활성화
  // geoLocation: Array<string>
};
