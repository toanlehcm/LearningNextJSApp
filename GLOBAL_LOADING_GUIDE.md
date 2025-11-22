# Hướng dẫn sử dụng Global Loading với React Query

## Cấu hình

Global loading đã được cấu hình tự động sử dụng `useIsFetching` từ React Query. Component `QueryLoadingIndicator` sẽ tự động theo dõi tất cả queries đang fetch và hiển thị loading spinner.

## Cách hoạt động

1. **QueryLoadingIndicator**: Component này sử dụng `useIsFetching` để theo dõi số lượng queries đang fetch
2. **Predicate filtering**: Chỉ những queries có `meta.isShowLoading !== false` mới được tính vào loading state
3. **Global Loading**: Component `GlobalLoading` sẽ tự động hiển thị khi có queries đang fetch

## Cách sử dụng

### 1. Mặc định - Hiển thị loading

```typescript
"use client";
import { useGetListUsers } from "@/hooks";

export default function UserPage() {
  // Loading sẽ tự động hiển thị khi fetch data
  const { data, isLoading, error } = useGetListUsers();

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 2. Tắt loading cho query cụ thể

```typescript
"use client";
import { useGetListUsers } from "@/hooks";

export default function UserPageNoLoading() {
  // Không hiển thị global loading cho query này
  const { data, isLoading } = useGetListUsers({ isShowLoading: false });

  return (
    <div>
      {isLoading && <div>Loading locally...</div>}
      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### 3. Tạo custom hook mới với global loading

```typescript
"use client";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/post.services";

interface UseGetPostOptions {
  isShowLoading?: boolean;
}

export function useGetPost(id: number, options?: UseGetPostOptions) {
  const { isShowLoading = true } = options || {};

  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    meta: {
      isShowLoading, // Quan trọng: Thêm meta này để QueryLoadingIndicator biết
    },
  });
}
```

## Lợi ích

✅ **Tự động**: Không cần gọi increase/decrease manually như axios interceptors  
✅ **Linh hoạt**: Có thể tắt loading cho từng query cụ thể  
✅ **Nhất quán**: Tất cả queries sử dụng React Query đều tự động có global loading  
✅ **Type-safe**: TypeScript hỗ trợ đầy đủ với options interface  
✅ **Performance**: useIsFetching được tối ưu bởi React Query

## So sánh với Axios Interceptors

### Axios Interceptors (cũ)
```typescript
axiosInstance.interceptors.request.use((config) => {
  useLoadingStore.getState().increase(); // Manual
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    useLoadingStore.getState().decrease(); // Manual
    return response;
  },
  (error) => {
    useLoadingStore.getState().decrease(); // Manual
    return Promise.reject(error);
  }
);
```

### React Query (mới)
```typescript
// Tự động với useIsFetching - Không cần code gì thêm!
const { data } = useGetListUsers(); // Loading tự động hiện
const { data } = useGetListUsers({ isShowLoading: false }); // Tắt loading
```
