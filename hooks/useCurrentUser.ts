import useSWR from "swr";

import fetcher from "@/lib/fetcher";

// 사용자의 현재 상태 가져오기
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
