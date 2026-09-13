"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://6a89d65120fcac8c1edf0434.mockapi.io";

type UseGetResult<T> = {
  data: T | undefined;
  loading: boolean;
  error: unknown;
  refresh: () => unknown;
};

function useGet<T = unknown>(url: string): UseGetResult<T> {
  const { data, isLoading, error, refetch } = useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const cleanUrl = url.replace(/^\/+/, "");
      const requestUrl = cleanUrl.startsWith("http")
        ? cleanUrl
        : `${API_URL}/${cleanUrl}`;

      const response = await axios.get(requestUrl);
      return (response.data.products ?? response.data) as T;
    },
    enabled: Boolean(url),
  });

  return {
    data,
    loading: isLoading,
    error,
    refresh: refetch,
  };
}

export default useGet;