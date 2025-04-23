"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <div>
            <h2 className="text-lg font-medium text-gray-700">Username</h2>
            <p className="text-gray-600">{username || "Not logged in"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
