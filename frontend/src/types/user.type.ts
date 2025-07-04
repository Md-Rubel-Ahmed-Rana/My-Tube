export type IUser = {
  _id: string;
  id: string;
  name: string;
  username: string;
  slug: string;
  subscriptions: number;
  subscribers: number;
  subscribed: number;
  photo: string;
  coverImage: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
