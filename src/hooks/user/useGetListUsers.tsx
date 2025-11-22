"use client";
import { getListUsers } from "@/services/user.services";
import { TypeListUsers } from "@/type";
import { useGlobalLoadingQuery, GlobalLoadingQueryOptions } from "@/hooks/useGlobalLoadingQuery";

type UseGetListUsersOptions = Omit<GlobalLoadingQueryOptions<TypeListUsers>, "queryKey" | "queryFn">;

export function useGetListUsers(options?: UseGetListUsersOptions) {
  return useGlobalLoadingQuery<TypeListUsers>({
    queryKey: ["get-list-user"],
    queryFn: getListUsers,
    staleTime: 5 * 60 * 1000, // Cache 5m for performance.
    refetchOnWindowFocus: false, // Do not refetch when window is focused.
    ...options, // Spread options để hỗ trợ isShowLoading và các options khác
  });
}
