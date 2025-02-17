import { useState } from 'react';
import '../../travel-planner/src/styles/Page.module.css';

const Hotels = () => {
    const [city, setCity] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [passengers, setPassengers] = useState(1);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleCheckInDateChange = (event) => {
        setCheckInDate(event.target.value);
    };

    const handleCheckOutDateChange = (event) => {
        setCheckOutDate(event.target.value);
    };

    const handlePassengersChange = (event) => {
        setPassengers(Math.max(0, parseInt(event.target.value)));
    };

    return (
        <div>
            <h1>Hotels</h1>
            <input 
                type="text" 
                placeholder="Enter city" 
                value={city} 
                onChange={handleCityChange} 
            />
            <input 
                type="date" 
                placeholder="Check-in date" 
                value={checkInDate} 
                onChange={handleCheckInDateChange} 
            />
            <input 
                type="date" 
                placeholder="Check-out date" 
                value={checkOutDate} 
                onChange={handleCheckOutDateChange} 
            />
            <div className="item">
                <h4 className="font-bold text-black input_text"> Travelers </h4>
                <input
                    className="rounded-lg border border-white p-2 pl-5 input"
                    type="number"
                    name="passengers"
                    value={passengers}
                    onChange={handlePassengersChange}
                />
            </div>
            <p>You are traveling to: {city}</p>
            <p>Check-in date: {checkInDate}</p>
            <p>Check-out date: {checkOutDate}</p>
            <p>Number of travelers: {passengers}</p>
        </div>
    );
}

export default Hotels;