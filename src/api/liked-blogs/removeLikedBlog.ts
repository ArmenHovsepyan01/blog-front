import axios from "axios";
import { createConfigForRequest } from "../../utilis/createConfigForRequest";

export async function removeLikedBlog(id: number) {
  try {
    const config = createConfigForRequest();
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URI}/liked-blogs/${id}`,
      config,
    );

    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}
