"use client";
import { useLoadingStore } from "@/stores/useLoadingStore";
import {
  useQuery,
  UseQueryOptions,
  QueryKey,
  UseQueryResult,
} from "@tanstack/react-query";
import { useEffect } from "react";

// Extend UseQueryOptions to include isShowLoading
export interface GlobalLoadingQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  /**
   * Show global loading indicator during query fetching
   * @default true
   */
  isShowLoading?: boolean;
}

/**
 * Custom hook that wraps useQuery with global loading indicator support.
 * 
 * @example
 * ```tsx
 * const { data } = useGlobalLoadingQuery({
 *   queryKey: ["users"],
 *   queryFn: getUsers,
 *   isShowLoading: true, // Optional, default is true
 * });
 * ```
 */
export function useGlobalLoadingQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  options: GlobalLoadingQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  const { isShowLoading = true, ...queryOptions } = options;

  const queryResult = useQuery<TQueryFnData, TError, TData, TQueryKey>(queryOptions);

  useEffect(() => {
    if (!isShowLoading) return;

    // Simple: Set loading based on isFetching state
    useLoadingStore.getState().setLoading(queryResult.isFetching);
  }, [queryResult.isFetching, isShowLoading]);

  return queryResult;
}
