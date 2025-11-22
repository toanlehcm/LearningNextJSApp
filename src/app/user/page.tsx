"use client";
import React, { useEffect, useState } from "react";
import { getListUsers } from "@/services/user.services";
import { TypeListUsers } from "@/type";

export default function UserPage() {
  const [users, setUsers] = useState<TypeListUsers | null>(null);

  useEffect(() => {
    const load = async () => {
      const listUsers = await getListUsers();
      setUsers(listUsers);
    };

    load();
  }, []);

  return (
    <div>
      {users &&
        users?.map((user) => {
          return (
            <div key={user.id}>
              <h2>{user.name}</h2>
            </div>
          );
        })}
    </div>
  );
}
