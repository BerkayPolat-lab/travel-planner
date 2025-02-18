"use client";

import styles from '../../styles/Page.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HotelSearchForm = ({ setHotels }) => {
    const [city, setCity] = useState("");
    const [resultsCity, setResultsCity] = useState([]);
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [travelers, setTravelers] = useState(1);

    useEffect(() => {
        if (city.trim() === "") {
            setResultsCity([]);
            return;
        }
        
        const fetchCities = async () => {
            try {
                const { data } = await axios.get(`/api/airports?query=${city}`);
                setResultsCity(data.map(airport => ({ Name: airport.City })));
            } catch (error) {
                console.error(error);
            }
        };
        
        const debounce = setTimeout(fetchCities, 150);
        return () => clearTimeout(debounce);
    }, [city]);

    const citySelect = (selectedCity) => {
        setCity(selectedCity.Name);
        setResultsCity([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!city || !checkInDate || !checkOutDate || travelers < 1) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const accessToken = "9IsxY6798GSIejIdxuCoGPZQphC3";
            const options = {
                method: 'GET',
                url: 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city',
                params: {
                    cityCode: "IST",
                    radius: 50,
                    radiusUnit: "KM"
                },
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.request(options);
            setHotels(response.data.data);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.item}>
                    <h4 className="font-bold text-black">City</h4>
                    <input className="rounded-lg border p-2 w-full" name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
                    {resultsCity.length > 0 && (
                        <ul className="absolute left-0 w-full bg-white border top-full mt-1 rounded shadow max-h-80 overflow-y-auto z-10">
                            {resultsCity.map((location, index) => (
                                <li key={index}>
                                    <button type='button' onClick={() => citySelect(location)} className="p-2 hover:bg-gray-200 cursor-pointer">
                                        {location.Name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={styles.item}>
                    <h4 className="font-bold text-black">Check-in Date</h4>
                    <input className="rounded-lg border p-2 w-full" type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                </div>
                <div className={styles.item}>
                    <h4 className="font-bold text-black">Check-out Date</h4>
                    <input className="rounded-lg border p-2 w-full" type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                </div>
                <div className={styles.item}>
                    <h4 className="font-bold text-black">Travelers</h4>
                    <input className="rounded-lg border p-2 w-full" type="number" min="1" value={travelers} onChange={(e) => setTravelers(Math.max(1, parseInt(e.target.value)))} />
                </div>
                <button type="submit" className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full">
                    Search
                </button>
            </form>
        </div>
    );
};

export default HotelSearchForm;
