"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // zachytí chybu
    });

    if (result?.error) {
      setError("Nesprávne prihlasovacie údaje");
    } else {
      // Pri úspechu - plný reload na "/"
      window.location.href = "/";
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-blue-500 text-white p-6 rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4">Prihlásenie</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Meno/Email [admin]"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Heslo [1234]"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Prihlásiť
        </button>
      </form>
    </div>
  );
}
