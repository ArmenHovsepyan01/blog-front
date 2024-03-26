import { createConfigForRequest } from "../createConfigForRequest";
import axios from "axios";

export async function createBlog(values: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URI}/blog`;
    const config = await createConfigForRequest();

    const { data } = await axios.post(url, values, config);

    return data.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
