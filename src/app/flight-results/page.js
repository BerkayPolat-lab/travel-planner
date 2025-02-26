"use client";
import styles from "../../styles/Page.module.css";
import Navbar from "../components/Navbar";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Key } from "react";
import Loading from "./loading";

const FlightResultsPage = () => {
  const searchParams = useSearchParams();
  const [flightData, setFlightData] = useState(null);

  const from = searchParams?.get("from") || "";
  const to = searchParams?.get("to") || "";
  const departDate = searchParams?.get("outbound_date") || "";
  const returnDate = searchParams?.get("return_date") || "";
  const adults = searchParams?.get("adults") || "";

  useEffect(() => {
    const fetchStoredData = () => {
      const storedData = localStorage.getItem("flightData");
      if (storedData !== null) {
        setFlightData(JSON.parse(storedData));
      }
    };

    fetchStoredData();
  }, []);

  useEffect(() => {
    console.log(flightData);
  }, [flightData]);

  if (flightData === null) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className={styles.flight_results_page}>
        <div className={styles.flight_card}>
          <h1 className={styles.flights_title}> Best Flights </h1>
          {flightData &&
            flightData.best_flights?.map((flightObj, index) => {
              return (
                <div key={index}>
                  {flightObj.flights?.map((flight) => (
                    <div className={styles.individual_flight} key={flight.id}>
                      <div className={styles.airline_logo}>
                        <img src={flightObj.airline_logo} alt="Airline Logo" />
                      </div>
                      <div className={styles.flight_details}>
                        <div className={styles.departure_airport}>
                          <h2> {flight.departure_airport.time}: {flight.departure_airport.name} </h2>
                        </div>
                        <div className={styles.flight_duration}>
                          <text> Duration: {Math.round(flightObj.total_duration / 60)}h{" "} {Math.round(flightObj.total_duration % 60)}m </text>
                        </div>
                        <div className={styles.arrival_airport}>
                          <h2> {flight.arrival_airport.time}: {flight.arrival_airport.name} </h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
        <div className={styles.flight_card}>
          <h1 className={styles.flights_title}> Other Flights </h1>
          {flightData &&
            flightData.other_flights?.map((flightObj, index) => {
              return (
                <div key={index}>
                  {flightObj.flights?.map((flight) => (
                    <div className={styles.individual_flight} key={flight.id}>
                      <div className={styles.airline_logo}>
                        <img src={flightObj.airline_logo} alt="Airline Logo" />
                      </div>
                      <div className={styles.flight_details}>
                        <div className={styles.departure_airport}>
                          <h2> {flight.departure_airport.time}: {flight.departure_airport.name} </h2>
                        </div>
                        <div className={styles.flight_duration}>
                          <text> Duration: {Math.round(flightObj.total_duration / 60)}h{" "} {Math.round(flightObj.total_duration % 60)}m </text>
                        </div>
                        <div className={styles.arrival_airport}>
                          <h2> {flight.arrival_airport.time}: {flight.arrival_airport.name} </h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FlightResultsPage;
