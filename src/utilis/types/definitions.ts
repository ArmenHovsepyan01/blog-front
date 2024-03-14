export interface IBlog {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  isPublished: boolean;
  userId: number;
  user: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
