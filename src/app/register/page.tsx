"use client"; // Wajib untuk Client Component

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (username && password) {
      // Simpan username ke localStorage
      localStorage.setItem("username", username);

      // Memicu event agar navbar mengetahui status login yang baru
      window.dispatchEvent(new Event("storage"));

      alert(`Registered successfully as ${username}`);
      router.push("/dashboard"); // Langsung redirect ke dashboard
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-white mb-4">Register</h2>
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
          onClick={handleRegister}
          className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md w-full"
        >
          Register
        </button>
      </div>
    </div>
  );
}
