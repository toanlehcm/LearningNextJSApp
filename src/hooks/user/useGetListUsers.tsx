"use client";
import { getListUsers } from "@/services/user.services";
import { TypeListUsers } from "@/type";
import { useQuery } from "@tanstack/react-query";

interface UseGetListUsersOptions {
  isShowLoading?: boolean;
}

export function useGetListUsers(options?: UseGetListUsersOptions): ReturnType<typeof useQuery<TypeListUsers>> {
  const { isShowLoading = true } = options || {};

  return useQuery<TypeListUsers>({
    queryKey: ["get-list-user"],
    queryFn: getListUsers,
    staleTime: 5 * 60 * 1000, // Cache 5m for performance.
    refetchOnWindowFocus: false, // Do not refetch when window is focused.
    meta: {
      isShowLoading, // Thêm meta để QueryLoadingIndicator biết có cần show loading không
    },
  });
}
