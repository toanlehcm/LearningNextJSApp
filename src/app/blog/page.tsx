import Posts from "@/app/ui/posts";
import { Suspense } from "react";
import Loading from "./loading";

export default function Page() {
  // Don't await the data fetching function
  // const posts = getPosts();

  return (
    <Suspense fallback={<Loading />}>
      <Posts />
    </Suspense>
  );
}
