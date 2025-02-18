"use client"; 

import { useState } from 'react';
import HotelSearchForm from '../src/app/components/HotelSearchForm.tsx';

export default function Page() {
  const [hotels, setHotels] = useState([]);

  return (
    <>
      <HotelSearchForm setHotels={setHotels} />

      {/* Display Hotel Results */}
      <div className="mt-5 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-3">Available Hotels</h2>
        <ul className="divide-y divide-gray-200">
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <li key={index} className="p-4">
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No hotels found.</p>
          )}
        </ul>
      </div>
    </>
  );
};
