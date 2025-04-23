"use client"; // Wajib untuk Client Component

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Panggil API Login di sini...
    const success = true; // simulasi sukses login
    const user = username; // username dari respon backend

    if (success) {
      localStorage.setItem("username", user);
      // Trigger event agar navbar tahu kalau sudah login
      window.dispatchEvent(new Event("storage"));
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 mb-4 rounded-md text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 mb-4 rounded-md text-black"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded-md w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}