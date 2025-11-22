import { Suspense } from "react";
import Loading from "./loading";
import Posts from "./BlogPosts";

export default function BlogPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Posts />
    </Suspense>
  );
}
