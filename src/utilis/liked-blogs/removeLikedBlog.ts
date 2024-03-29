import axios from "axios";
import { createConfigForRequest } from "../createConfigForRequest";

export async function removeLikedBlog(id: number) {
  try {
    const config = await createConfigForRequest();
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URI}/liked-blogs/${id}`,
      config,
    );

    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}
