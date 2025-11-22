"use client";
import React, { useEffect, useState } from "react";
import { getPosts } from "@/services/post.services";
import { getListUsers } from "@/services/user.services";
import { TypeListUsers } from "@/type";
import { TypeListPosts } from "@/type/post.type";

export default function UserPostPage() {
  const [users, setUsers] = useState<TypeListUsers | null>(null);
  const [posts, setPosts] = useState<TypeListPosts | null>(null);

  useEffect(() => {
    getListUser();
    getListPost();
  }, []);

  const getListUser = async () => {
    const listUsers = await getListUsers();
    setUsers(listUsers);
  };

  const getListPost = async () => {
    const postsData = await getPosts();
    setPosts(postsData);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1>User</h1>
        {users &&
          users?.map((user) => {
            return (
              <div key={user.id}>
                <h2>{user.name}</h2>
              </div>
            );
          })}
      </div>

      <div className="flex flex-col gap-2">
        <h1>Post</h1>
        {posts &&
          posts.map((post) => {
            return (
              <div key={post.id}>
                <h2>{post.title}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
}
