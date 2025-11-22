"use client";
import { getPosts } from "@/services/post.services";
import { TypeListPosts } from "@/type/post.type";
import React, { useEffect, useState } from "react";

export default function PostPage() {
  const [posts, setPosts] = useState<TypeListPosts | null>(null);

  useEffect(() => {
    const load = async () => {
      const postsData = await getPosts();
      console.log("postsData", postsData);

      setPosts(postsData);
    };

    load();
  }, []);

  return (
    <div>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
            </div>
          );
        })}
    </div>
  );
}
