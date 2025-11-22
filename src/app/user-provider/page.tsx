"use client";
import { useGetListUsers } from "@/hooks";
import React from "react";

export default function UserProviderPage() {
  const { data: dataListProvider } = useGetListUsers();
  // const { data: dataListProvider } = useGetListUsers({ isShowLoading: false });

  return (
    <div className="flex flex-col gap-2">
      <h1>Provider</h1>

      {dataListProvider &&
        dataListProvider?.map((user) => {
          return (
            <div key={user.id}>
              <h2>{user.name}</h2>
            </div>
          );
        })}
    </div>
  );
}
