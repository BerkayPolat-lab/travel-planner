import { useState } from 'react';

const Hotels = () => {
    const [city, setCity] = useState('');

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <div>
            <h1>Hotels</h1>
            <input 
                type="text" 
                placeholder="Enter city" 
                value={city} 
                onChange={handleInputChange} 
            />
            <p>You are traveling to: {city}</p>
        </div>
    );
}

export default Hotels;