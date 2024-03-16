export interface IBlog {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  isPublished: boolean;
  userId: number;
  user?: IBlogUser;
  createdAt: string;
  updatedAt: string;
}

interface IBlogUser {
  firstName: string;
  lastName: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ILikedBlog {
  id: number;
  blog: IBlog;
  user: IBlogUser;
}
