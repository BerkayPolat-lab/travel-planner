"use client";

import styles from '../../styles/Page.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SearchForm = () => {
    const [from, setFrom] = useState("");
    const [resultsFrom, setResultsFrom] = useState([]);


    const [to, setTo] = useState("");
    const [resultsTo, setResultsTo] = useState([]);
  
    const [passengers, setPassengers] = useState(0);
    const [departDate, setDepartDate] = useState("");
    const [arriveDate, setArriveDate] = useState("");

    // Fetching the Search Results for the Depart Field
    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const { data } = await axios.get(`/api/airports?query=${from}`);
                console.log(data);
                setResultsFrom(data);
            } catch (error) {
                console.error(error)
            }
        }

        const debounce = setTimeout(fetchAirports, 150);
        return () => clearTimeout(debounce);
    }, [from]);

    // Fetching the Search Results for the Arrive Field
    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const { data } = await axios.get(`/api/airports?query=${to}`);
                console.log(data);
                setResultsTo(data);
            } catch (error) {
                console.error(error)
            }
        }

        const debounce = setTimeout(fetchAirports, 150);
        return () => clearTimeout(debounce);
    }, [to]);

    
    const airportSelectFrom = (airport) => {
        console.log(airport.IATA)
        setFrom(airport.Name + " (" + airport.IATA + ")");
        setResultsFrom([]);
    }

    const airportSelectTo = (airport) => {
        console.log(airport.IATA)
        setTo(airport.Name + " (" + airport.IATA + ")");
        setResultsTo([]);
    }

    return (
    <div className={styles.container}> 
    <form className={styles.form}> 
        <div className={styles.item}>
            <h4 className={`font-bold text-black ${styles.input_text}`}> From </h4>
            <input
                className={`rounded-lg border border-white p-2 w-full ${styles.input}`}
                name="from"
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Leaving from"
            />
            {resultsFrom.length > 0 && (
            <ul className="absolute left-0 w-full bg-white border top-full mt-1 rounded shadow max-h-80 overflow-y-auto z-10 y-5">
                {resultsFrom.map((airport) => (
                    <li  key={airport._id}> 
                        <button type='button' onClick={() => airportSelectFrom(airport)} className="p-2 hover:g-gray-200 cursor-pointer">
                            {airport.Name} ({airport.IATA})
                        </button>
                    </li>
                ))}
                </ul>
            )}
        </div>
        <div className={styles.item}> 
        <h4 className={`font-bold text-black ${styles.input_text}`}> To </h4>
        <input
            id="to"
            name="to"
            type="text"
            placeholder="Going to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className={`rounded-lg border border-white p-2 w-full ${styles.input}`}
            />
            {resultsTo.length > 0 && (
            <ul className="absolute left-0 w-full bg-white border top-full mt-1 rounded shadow max-h-80 overflow-y-auto z-10 y-5">
                {resultsTo.map((airport) => (
                    <li  key={airport._id}> 
                        <button type='button' onClick={() => airportSelectTo(airport)} className="p-2 hover:g-gray-200 cursor-pointer">
                            {airport.Name} ({airport.IATA})
                        </button>
                    </li>
                ))}
                </ul>
            )}
        </div>
        <div className={styles.item}>
        <h4 className={`font-bold text-black ${styles.input_text}`}> Depart </h4>
          <input
          className={`rounded-lg border border-white p-2 pl-5 ${styles.input}`} 
          type="date"
          id="date-start"
          name="trip-start"
          placeholder="depart"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          />
        </div>
        <div className={styles.item}>
        <h4 className={`font-bold text-black ${styles.input_text}`}> Return </h4>
          <input
          className={`rounded-lg border border-white p-2 pl-5 ${styles.input}`}
          type="date"
          placeholder="arrive"
          id="date-arrive"
          name="date-arrive"
          value={arriveDate}
          onChange={(e) => setArriveDate(e.target.value)}
          />
        </div>
        <div className={styles.item}>
        <h4 className={`font-bold text-black ${styles.input_text}`}> Travelers </h4>
          <input
          className={`rounded-lg border border-white p-2 pl-5 ${styles.input}`}
          type="number"
          name="passengers"
          value={passengers}
          onChange={(e) => setPassengers(Math.max(0, parseInt(e.target.value)))}
          />
        </div>
        <button type="submit" className={`block min-w-0 bold grow py-1.5 pr-3 pl-1 text-base text-gray-100 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${styles.search}`}>Search</button>
      </form>
    </div>
    )

}


export default SearchForm;