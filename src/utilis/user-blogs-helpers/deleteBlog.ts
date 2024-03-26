import { createConfigForRequest } from "../createConfigForRequest";
import axios from "axios";

export const deleteBlogById = async (id: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URI}/blog/${id}`;
    const config = await createConfigForRequest();

    const { data } = await axios.delete(url, config);

    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};
