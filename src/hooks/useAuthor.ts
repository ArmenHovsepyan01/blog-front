import useSWR from "swr";
import { fetcher } from "../utilis/fetcher";

export function useAuthor(id?: string) {
  const url = `http://localhost:5000/user/${id}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    user: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}
