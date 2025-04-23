'use client';
import { useState, useEffect } from 'react'; // Import useEffect untuk cek status login
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Link from 'next/link';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Cek status login saat halaman dimuat
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("You need to login first!");
      window.location.href = "/login"; // Redirect ke halaman login jika belum login
    }
  }, []);

  // Data for Monthly Revenue Bar Chart
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 7000, 6500, 8000, 9000, 10000],
        backgroundColor: '#4F46E5',
        borderRadius: 4,
      },
    ],
  };
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
        font: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: '#e5e7eb',
        },
      },
    },
  };

  // Data for Room Occupancy Pie Chart
  const pieChartData = {
    labels: ['Occupied', 'Available'],
    datasets: [
      {
        label: 'Room Occupancy',
        data: [30, 20],
        backgroundColor: ['#10B981', '#EF4444'],
        hoverOffset: 4,
      },
    ],
  };
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Room Occupancy',
        font: {
          size: 14,
        },
      },
    },
  };

  // Data for Recommended Rooms
  const recommendedRooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$150/night',
      class: 'Luxury',
    },
    {
      id: 2,
      name: 'Standard Room',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$100/night',
      class: 'Standard',
    },
    {
      id: 3,
      name: 'Suite Room',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
      price: '$250/night',
      class: 'Premium',
    },
  ];

  // Data for Customer Testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      review: 'The Deluxe Room was amazing! The view was breathtaking, and the service was top-notch.',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'Michael Brown',
      review: 'I had a great stay at the Standard Room. Very comfortable and clean.',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 3,
      name: 'Emily Davis',
      review: 'The Suite Room exceeded my expectations. Highly recommend it!',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  return (
    <div>
      {/* Main Content */}
      <div className="p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Rooms */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l-2-2m2 2V4a1 1 0 00-1-1h-3a1 1 0 00-1 1v10"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Total Rooms</h2>
              <p className="text-2xl font-bold text-indigo-600 mt-1">300</p>
            </div>
          </div>

          {/* Occupied Rooms */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Occupied Rooms</h2>
              <p className="text-2xl font-bold text-green-600 mt-1">150</p>
            </div>
          </div>

          {/* Available Rooms */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Available Rooms</h2>
              <p className="text-2xl font-bold text-red-600 mt-1">150</p>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Total Revenue</h2>
              <p className="text-2xl font-bold text-blue-600 mt-1">$100,000</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Monthly Revenue Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md h-64">
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Room Occupancy Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md h-64">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>

        {/* Hotel Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About FinWise Hotel</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side: Image */}
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                alt="FinWise Hotel"
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
            {/* Right Side: Text */}
            <div className="md:w-1/2">
              <p className="text-gray-600 text-sm mb-4">
                FinWise Hotel is a luxury hotel located in the heart of the city. Established in 2010, we have been
                providing exceptional service and unforgettable experiences for our guests. Our hotel features 50
                beautifully designed rooms, ranging from standard to premium suites, each equipped with modern amenities
                to ensure your comfort.
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Our commitment to quality is reflected in every aspect of our service. From our 24/7 concierge to our
                world-class dining options, we strive to exceed your expectations. Whether you're visiting for business or
                leisure, FinWise Hotel is your perfect destination.
              </p>
              <p className="text-gray-600 text-sm">
                Join us and experience the ultimate in hospitality. We look forward to welcoming you to FinWise Hotel!
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Rooms Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedRooms.map((room) => (
              <div key={room.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <img src={room.image} alt={room.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg font-semibold text-gray-800">{room.name}</h3>
                <p className="text-gray-600 text-sm">{room.class}</p>
                <p className="text-indigo-600 font-bold mt-2">{room.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{testimonial.review}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-2">About Us</h3>
                <p className="text-sm text-gray-400">
                  FinWise Hotel is a luxury hotel located in the heart of the city. We provide exceptional service and
                  unforgettable experiences for our guests.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Contact Us</h3>
                <p className="text-sm text-gray-400">Email: info@finwisehotel.com</p>
                <p className="text-sm text-gray-400">Phone: +1 (123) 456-7890</p>
                <p className="text-sm text-gray-400">Address: 123 Luxury Lane, Cityville</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                      />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                      />
                    </svg>
                  </Link>
                  <Link href="#" className="text-gray-400 hover:text-white transition duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}