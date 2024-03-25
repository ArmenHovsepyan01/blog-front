import useSWR from "swr";
import { fetcher } from "@/utilis/fetcher";

export function useUserFollowers(id?: string) {
  const url = `http://localhost:5000/followers/${id}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    followers: data,
    isLoading,
    isError: error,
    mutate,
  };
}
