// app/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  // Cek status login saat komponen mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (accessToken && user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, []);

  // Update navbar ketika storage berubah
  useEffect(() => {
    const handleStorageChange = () => {
      const accessToken = localStorage.getItem('accessToken');
      const user = localStorage.getItem('user');

      if (accessToken && user) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(user));
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    setIsAccountDropdownOpen(false);
    window.dispatchEvent(new Event('storage'));
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-lg font-bold">FinWise</div>

          {/* Menu Tengah */}
          <div className="hidden md:flex space-x-4 items-center">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
                  Dashboard
                </Link>
                <Link href="/users" className="hover:bg-gray-700 px-3 py-2 rounded">
                  Users
                </Link>
                <Link href="/rooms" className="hover:bg-gray-700 px-3 py-2 rounded">
                  Rooms
                </Link>
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="hover:bg-gray-700 px-3 py-2 rounded"
                  >
                    Transaction
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow z-10">
                      <Link
                        href="/booking"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Booking
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">
                  Blog
                </Link>
                <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">
                  About
                </Link>
                <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded">
                  Contact
                </Link>
              </>
            )}
          </div>

          {/* Tombol Login/Register atau Akun */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleAccountDropdown}
                  className="flex items-center hover:bg-gray-700 px-3 py-2 rounded"
                >
                  {userData?.image ? (
                    <img
                      src={userData.image}
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                      <span className="text-white text-xs">
                        {userData?.firstName?.charAt(0) || 'U'}
                      </span>
                    </div>
                  )}
                  <span>{userData?.username }</span>
                </button>
                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/change-password"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsAccountDropdownOpen(false)}
                    >
                      Change Password
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/register" className="hover:bg-gray-700 px-3 py-2 rounded">
                  Register
                </Link>
                <Link href="/login" className="hover:bg-gray-700 px-3 py-2 rounded">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}