"use client";

import { useIsFetching } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoadingStore } from "@/stores/useLoadingStore";

/**
 * Component tự động theo dõi tất cả queries đang fetch và cập nhật global loading state.
 * Sử dụng useIsFetching để phát hiện queries đang chạy.
 *
 * Để tắt loading cho một query cụ thể, thêm meta: { isShowLoading: false } vào query options.
 */
export default function QueryLoadingIndicator() {
  // Đếm số lượng queries đang fetch (không bao gồm queries có meta.isShowLoading = false)
  const fetchingCount = useIsFetching({
    predicate: (query) => {
      // Chỉ đếm những queries không tắt loading
      const isShowLoading = query.meta?.isShowLoading !== false;
      return isShowLoading;
    },
  });

  useEffect(() => {
    // Khi có queries đang fetch, hiện loading
    // console.log("fetchingCount", fetchingCount);

    if (fetchingCount > 0) {
      useLoadingStore.getState().setLoading(true);
    } else {
      // Khi không còn query nào đang fetch, tắt loading
      useLoadingStore.getState().setLoading(false);
    }
  }, [fetchingCount]);

  return null; // Component này chỉ theo dõi, không render gì
}
