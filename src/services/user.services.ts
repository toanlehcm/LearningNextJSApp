import axios from "./axios";
import { TypeListUsers, IUser } from "@/type";

export const getListUsers = async (): Promise<TypeListUsers> => {
  const { data } = await axios.get<TypeListUsers>("/users");
  return data;
};

export const getUserById = async (id: number): Promise<IUser> => {
  const { data } = await axios.get<IUser>(`/users/${id}`);
  return data;
};
