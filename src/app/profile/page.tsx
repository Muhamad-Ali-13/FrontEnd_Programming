"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<{
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Ambil data user dari localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Semua field harus diisi.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Password baru dan konfirmasi tidak cocok.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password baru minimal 6 karakter.");
      return;
    }

    // Contoh logika update password
    // Di sini kamu bisa ganti dengan API call ke backend

    // Simulasi validasi password lama (hanya demo)
    const storedPassword = localStorage.getItem("password"); // JANGAN SIMPAN PASSWORD DI LOCAL STORAGE DI PRODUKSI!

    if (currentPassword !== storedPassword) {
      setMessage("Password lama salah.");
      return;
    }

    // Simpan password baru (hanya demo)
    localStorage.setItem("password", newPassword);

    setMessage("Password berhasil diperbarui!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-700">Memuat data profil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profil Pengguna</h1>

        {/* Data Profil */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-700">Nama Lengkap</h2>
            <p className="text-gray-900">{user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Muhamad Ali"}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-700">Username</h2>
            <p className="text-gray-900">{user.username || "username" }</p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-700">Email</h2>
            <p className="text-gray-900">{user.email || "password"}</p>
          </div>
        </div>

        {/* Form Ganti Password */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ganti Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Password Lama
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan password lama"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Password Baru
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Masukkan password baru"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Konfirmasi password baru"
              />
            </div>

            {message && (
              <p className={`text-sm ${message.includes("berhasil") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-right">
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            ← Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}