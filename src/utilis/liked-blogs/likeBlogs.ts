import axios from "axios";

import { createConfigForRequest } from "../createConfigForRequest";
import { ILikedBlog } from "../types/definitions";

export async function likeBlogs(blogId: number) {
  try {
    const config = createConfigForRequest();

    const body = {
      blogId,
    };

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URI}/liked-blogs`,
      body,
      config,
    );

    return data as ILikedBlog[];
  } catch (e: any) {
    throw new Error(e);
  }
}
