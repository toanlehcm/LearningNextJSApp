// app/ui/Signup.tsx
"use client";

import { useActionState } from "react";
import { createUser } from "../action";
import { Button } from "@mui/material";

const initialState = {
  message: "", // Initial state for error messages
};

export function Signup() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form action={formAction}>
      {/* Email Input */}
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />

      {/* Error Message */}
      <p aria-live="polite" style={{ color: "red" }}>
        {state?.message}
      </p>

      {/* Submit Button */}
      <Button variant="contained" type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Sign Up"}
      </Button>
    </form>
  );
}
