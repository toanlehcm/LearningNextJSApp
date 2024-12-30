"use client";

import { use } from "react";

interface Post {
  id: number;
  title: string;
}

async function fetchPosts(): Promise<Post[]> {
  // Simulate an API call
  return [
    { id: 1, title: "First Post test" },
    { id: 2, title: "Second Post test" },
  ];
}

export default function Posts() {
  const postsList = use(fetchPosts()); // Suspends the component until the promise resolves

  return (
    <ul>
      {postsList.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
