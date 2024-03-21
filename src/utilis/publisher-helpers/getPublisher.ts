import axios from "axios";

export async function getPublisherInfo(id: number) {
  try {
    const { data } = await axios.get(`http://localhost:5000/user/${id}`);
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
}
