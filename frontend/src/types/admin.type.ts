export type IAdmin = {
  _id: string;
  id: string;
  name: string;
  role: string;
  photo: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ICreateAdmin = {
  name: string;
  email: string;
  password: string;
};
