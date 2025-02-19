"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
    const [total, setTotal] = useState(0);

    const tambah = () => {
        setTotal(total + 1);
    }

    useEffect(() => {
        tambah();
    },[]);
    

    return (
        <div className="min-h-screen bg-gray-100 mt-5 ms-5">
            <h1>{total}</h1>
            <button className="bg-gray-700  text-white px-3 py-2 rounded-md text-sm font-medium" onClick={tambah}>
                Click Button
            </button>
        </div>
    );
}
