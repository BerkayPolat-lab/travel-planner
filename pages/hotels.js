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
        <h3>{hotels}</h3>
      </div>
    </>
  );
}
