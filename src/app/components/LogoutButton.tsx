"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-600 text-white px-2 py-2 rounded cursor-pointer"
    >
      Odhlásiť
    </button>
  );
}
