import { createConfigForRequest } from "../createConfigForRequest";
import axios from "axios";

interface IValues {
  title: string;
  content: string;
  image: any;
}

export const updateBlogById = async (values: any, id: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URI}/blog/${id}`;
    const config = await createConfigForRequest();

    const { data } = await axios.post(url, values, config);

    return data.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
