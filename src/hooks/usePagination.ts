import useSWRInfinite from "swr/infinite";
import { useMemo } from "react";
import { fetcher } from "../utilis/fetcher";

export function usePagination<T>(url: string, userId: string, limit = 2) {
  // http://localhost:5000/followings

  const getKey = (pageIndex: number, previousPageData: T[]) => {
    pageIndex = pageIndex + 1;
    if (previousPageData && !previousPageData.length) return null;

    return `${url}/${userId}?page=${pageIndex}&limit=${limit}`;
  };

  const { data, size, setSize, error, mutate } = useSWRInfinite(
    getKey,
    fetcher,
  );

  const followings = data?.flat();

  const isLoadingMore =
    followings && typeof followings[size - 1] === "undefined";

  const isReachedEnd = data && data[data.length - 1]?.length < 2;

  return {
    followings: followings as T[],
    size,
    setSize,
    isLoadingMore,
    isReachedEnd,
    mutate,
    error,
  };
}
