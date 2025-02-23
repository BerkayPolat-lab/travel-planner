"use client";
import styles from '../../styles/Page.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const SearchForm = () => {
    const [from, setFrom] = useState("");
    const [resultsFrom, setResultsFrom] = useState([]);

    const [to, setTo] = useState("");
    const [resultsTo, setResultsTo] = useState([]);

    const [departDate, setDepartDate] = useState("");
    const [arriveDate, setArriveDate] = useState("");

    const [passengers, setPassengers] = useState(0);

    const router = useRouter();

    // Fetching the Search Results for the Depart Field
    useEffect(() => {
        const fetchAirports = async () => {
            if (!from) return;
            try {
                const { data } = await axios.get(`api/airports?query=${from}`);
                console.log(data);
                setResultsFrom(data);
            } catch (error) {
                console.error("Error fetching flights:", error)
            }
        }

        const debounce = setTimeout(fetchAirports, 150);
        return () => clearTimeout(debounce);
    }, [from]);

    // Fetching the Search Results for the Arrive Field
    useEffect(() => {
        const fetchAirports = async () => {
            if (!to) return;
            try {
                const { data } = await axios.get(`api/airports?query=${to}`);
                console.log(data);
                setResultsTo(data);
            } catch (error) {
                console.error("Error fetching flights:", error)
            }
        }

        const debounce = setTimeout(fetchAirports, 150);
        return () => clearTimeout(debounce);
    }, [to]);


    const airportSelectFrom = (airport: { IATA: string; Name: string }) => {
        console.log(airport.IATA);
        setFrom(airport.IATA);
        setResultsFrom([]);
    }

    const airportSelectTo = (airport: { IATA: string; Name: string }) => {
        console.log(airport.IATA);
        setTo(airport.IATA);
        setResultsTo([]);
    }


    const fetchFlightData = async (e: React.FormEvent<HTMLFormElement>, from: string, to: string, departDate: string, arriveDate: string, passengers: number) => {
        console.log(from);
        console.log(to);
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:5001/api/flights", {
                params: { departDate, from, to, arriveDate, passengers }
            })
            localStorage.setItem("flightData", JSON.stringify(response.data));
            console.log(response.data);
            router.push(`/flight-results?from=${from}&to=${to}&departDate=${departDate}&arriveDate=${arriveDate}&passengers=${passengers}`);
        } catch (error) {
            console.log("Error fetching flight data:", error);
        }

        fetchFlightData;
    }
    //
    //
    //


    return (
        <div className={styles.container}>
            {/* Flights Form */}
            <form className={styles.form} onSubmit={(e) => fetchFlightData(e, from, to, departDate, arriveDate, passengers)}>
                <div className={styles.item}>
                    <h4 className={`font-bold text-black ${styles.input_text}`}> From </h4>
                    <input
                        className={`rounded-lg border border-white p-2 w-full ${styles.input}`}
                        name="from"
                        type="text"
                        value={from}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFrom(e.target.value)}
                        placeholder="Leaving from"
                    />
                    {resultsFrom.length > 0 && (
                        <ul className="absolute left-0 w-full bg-white border top-full mt-1 rounded shadow max-h-80 overflow-y-auto z-10 y-5">
                            {resultsFrom.map((airport) => (
                                <li key={airport._id}>
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTo(e.target.value)}
                        className={`rounded-lg border border-white p-2 w-full ${styles.input}`}
                    />
                    {resultsTo.length > 0 && (
                        <ul className="absolute left-0 w-full bg-white border top-full mt-1 rounded shadow max-h-80 overflow-y-auto z-10 y-5">
                            {resultsTo.map((airport) => (
                                <li key={airport._id}>
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            console.log(departDate);
                            setDepartDate(e.target.value)
                        }
                        }
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            console.log(arriveDate);
                            setArriveDate(e.target.value)
                        }}
                    />
                </div>
                <div className={styles.item}>
                    <h4 className={`font-bold text-black ${styles.input_text}`}> Travelers </h4>
                    <input
                        className={`rounded-lg border border-white p-2 pl-5 ${styles.input}`}
                        type="number"
                        name="passengers"
                        value={passengers}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassengers(Math.max(0, parseInt(e.target.value)))}
                    />
                </div>
                <button type="submit" className={`block min-w-0 bold grow py-1.5 pr-3 pl-1 text-base text-gray-100 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${styles.search}`}>Search</button>
            </form>


        </div>
    )

}


export default SearchForm;