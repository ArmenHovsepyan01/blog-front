import axios from "axios";
import { createConfigForRequest } from "./createConfigForRequest";

export async function getUserBlogs() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URI}/user-blogs`;
    const config = await createConfigForRequest();

    const { data } = await axios.get(url, config);

    return data.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
