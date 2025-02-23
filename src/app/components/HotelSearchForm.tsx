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

    
    async function getEntityId(city) {
    const options = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel',
        params: { query: city },
        headers: {
            'x-rapidapi-key': 'b256d1b6b9msh21d1dfbee2e3782p127990jsna0ec6b06a102',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        if (!response.data || response.data.status === false) {
            console.log("Error message:", response.data.message);  // ✅ Log the error message
            return null;
        }
        return response.data.data[0].entityId;
    } catch (error) {
        console.error('Error fetching entity ID:', error);
        return null;
    }
}

    const entityId = await getEntityId(city);
    const options = {
        method: 'GET',
        url: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchHotels',
        params: {
            entityId: entityId,
            checkin: checkInDate,
            checkout: checkOutDate,
            adults: travelers.toString(),
            rooms: '1',
            limit: '30',
            sorting: '-relevance',
            currency: 'USD',
            market: 'en-US',
        },
        headers: {
            'x-rapidapi-key': 'b256d1b6b9msh21d1dfbee2e3782p127990jsna0ec6b06a102',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
    };

    try {
        if (!entityId) {
            console.error('City not found. Please try again.');
            return;
        }
        const response = await axios.request(options);
        if (!response.data || response.data.status === false) {
            console.log("Error message:", response.data.message);  // ✅ Log the error message
        }
        setHotels(response.data.data.hotels);
    } catch (error) {
        console.error("API Request Failed:", error);
        console.error("Error Details:", error.response?.data || error.message);
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
                    <input className="rounded-lg border p-2 w-full" type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                </div>
                <div className={styles.item}>
                    <h4 className="font-bold text-black">Check-out Date</h4>
                    <input className="rounded-lg border p-2 w-full" type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate} />
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
