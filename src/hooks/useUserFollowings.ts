import useSWR from "swr";
import { fetcher } from "../utilis/fetcher";

export function useUserFollowings(id?: number) {
  const url = `http://localhost:5000/followings/${id}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    followings: data?.data,
    isLoading,
    isError: error,
    mutate,
  };
}
