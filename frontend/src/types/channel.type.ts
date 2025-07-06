export type ITopChannel = {
  id: string;
  name: string;
  username: string;
  slug: string;
  email: string;
  photo: string;
  score: number;
  commentCount: number;
  subscriberCount: number;
  videoCount: number;
};

export type IChannelStats = {
  totalChannels: number;
  totalSubscribers: number;
  topChannels: {
    _id: string;
    name: string;
    subscriberCount: number;
  }[];
};
