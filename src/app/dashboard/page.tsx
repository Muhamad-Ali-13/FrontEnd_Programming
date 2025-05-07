'use client';
import { useRouter } from 'next/navigation'; // Import useRouter untuk redirect
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
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Revenue Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md h-64">
            <Bar data={barChartData} options={barChartOptions} />
          </div>

          {/* Room Occupancy Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md h-64">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>


      </div>
    </div>
  );
}