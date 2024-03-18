import { createConfigForRequest } from "../createConfigForRequest";
import axios from "axios";

export const deleteBlogById = async (id: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URI}/blog/${id}`;
    const config = createConfigForRequest();

    const { data } = await axios.delete(url, config);

    console.log(data);

    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};
