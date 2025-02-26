"use client"; 

import { useState } from 'react';
import HotelSearchForm from '../components/HotelSearchForm';
import Navbar from '../components/Navbar';

export default function Page() {
  const [hotels, setHotels] = useState([]);

  return (
    <>
      <Navbar />
      <HotelSearchForm setHotels={setHotels} />

      <div className="mt-5 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-3">Available Hotels</h2>
        
        {hotels.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {hotels.map((hotel, index) => (
              <li key={index} className="p-4 border-b">
                <h3 className="text-lg font-semibold">{hotel.name || "Hotel Name Not Available"}</h3>
                <p className="text-gray-600">
                  <strong>Price:</strong> {hotel.price ? `${hotel.price}` : "N/A"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hotels found.</p>
        )}
      </div>
    </>
  );
}
