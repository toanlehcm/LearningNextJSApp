import axios from "./axios";
import { IPost, TypeListPosts } from "@/type/post.type";

export const getPosts = async (): Promise<TypeListPosts> => {
  const { data } = await axios.get<TypeListPosts>("/posts");
  return data;
};

export const getPostsByUser = async (userId: number): Promise<IPost> => {
  const { data } = await axios.get<IPost>(`/posts?userId=${userId}`);
  return data;
};
