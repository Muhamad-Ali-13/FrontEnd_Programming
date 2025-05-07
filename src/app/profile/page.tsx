'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Ambil token dari localStorage
        const token = localStorage.getItem('accessToken');

        // Cek apakah token ada
        if (!token) {
          throw new Error('Token tidak ditemukan. Silakan login kembali.');
        }

        // Kirim permintaan ke API
        const response = await fetch('https://simaru.amisbudi.cloud/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        // Cek apakah server mengarahkan ke halaman login (redireksi ke HTML)
        if (response.redirected) {
          window.location.href = response.url; // Arahkan ke halaman login
          return;
        }

        // Cek apakah respons bukan JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text(); // Simpan sebagai HTML
          console.error('Bukan JSON:', text);
          throw new Error('Respons server bukan JSON (kemungkinan halaman 404 atau login)');
        }

        // Cek status HTTP
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Gagal memuat data profil');
        }

        // Parsing JSON jika semua valid
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Tidak dapat memuat data profil. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  // Tampilan saat loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  // Tampilan jika terjadi error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-md w-full max-w-md">
          <h2 className="text-lg font-medium text-red-800">Kesalahan</h2>
          <p className="mt-2 text-sm text-red-700">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition duration-150"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header Profil */}
          <div className="bg-gray-800 px-6 py-8 text-white">
            <h1 className="text-2xl font-bold">Profil Pengguna</h1>
            <p className="text-gray-200">Kelola informasi akun Anda</p>
          </div>

          {/* Konten Profil */}
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">Nama Lengkap</h2>
                <p className="text-gray-800">{userData?.name || 'Data tidak tersedia'}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
                <p className="text-gray-800">{userData?.email || 'Data tidak tersedia'}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">Role</h2>
                <p className="text-gray-800 capitalize">{userData?.role || 'Data tidak tersedia'}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-1">Tanggal Registrasi</h2>
                <p className="text-gray-800">
                  {userData?.created_at 
                    ? new Date(userData.created_at).toLocaleDateString('id-ID') 
                    : 'Data tidak tersedia'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}