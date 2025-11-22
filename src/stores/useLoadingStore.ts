import { create } from "zustand";

interface LoadingState {
  pendingRequests: number;
  isLoading: boolean;
  // increase: () => void;
  // decrease: () => void;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  pendingRequests: 0,
  isLoading: false,

  // increase: () =>
  //   set((state) => ({
  //     pendingRequests: state.pendingRequests + 1,
  //     isLoading: true,
  //   })),

  // decrease: () =>
  //   set((state) => {
  //     const newCount = Math.max(0, state.pendingRequests - 1);
  //     return {
  //       pendingRequests: newCount,
  //       isLoading: newCount > 0,
  //     };
  //   }),

  setLoading: (loading: boolean) =>
    set(() => ({
      isLoading: loading,
    })),
}));
