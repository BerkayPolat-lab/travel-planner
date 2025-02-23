"use client";
import styles from "../../styles/Page.module.css";
import Navbar from "../components/Navbar";
import { useSearchParams } from "next/navigation";
import {useState, useEffect} from "react";

const FlightResultsPage = () => {
  const searchParams = useSearchParams();
  const [flightData, setFlightData] = useState(null);
  const from = searchParams?.get("from") || "";
  const to = searchParams?.get("to") || "";
  const departDate = searchParams?.get("outbound_date") || "";
  const returnDate = searchParams?.get("return_date") || "";
  const adults = searchParams?.get("adults") || "";

  useEffect(() => {
    const storedData = localStorage.getItem("flightData");
    if (storedData) {
      setFlightData(JSON.parse(storedData));
      console.log(flightData)
    }
  }, []);

  return (
    <>
      <Navbar />

    </>
  );
};

export default FlightResultsPage;
