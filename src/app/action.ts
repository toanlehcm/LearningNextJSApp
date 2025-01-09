// app/actions.ts
"use server";

import { redirect } from "next/navigation";

export async function createUser(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString() || "";

  // Simulating a server call
  // const res = await fetch("https://api.example.com/create-user", {
  //   method: "POST",
  //   body: JSON.stringify({ email }),
  //   headers: { "Content-Type": "application/json" },
  // });

  // const json = await res.json();
  const res = {
    ok: false,
  };

  // Handle validation error

  if (!res.ok) {
    return { message: "Please enter a valid email" }; //json.error ||
  }

  // Redirect on success
  redirect("/dashboard");
}
