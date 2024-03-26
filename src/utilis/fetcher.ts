import axios from "axios";
import { createConfigForRequest } from "./createConfigForRequest";

export async function fetcher(url: string) {
  try {
    const config = await createConfigForRequest();

    const { data } = await axios.get(url, config);
    return data.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
