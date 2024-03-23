import { createConfigForRequest } from "../createConfigForRequest";
import axios from "axios";

export async function getAllLikedBlogs() {
  try {
    const config = await createConfigForRequest();
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URI}/liked-blogs`,
      config,
    );
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}
