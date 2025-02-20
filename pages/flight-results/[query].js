"use client";

import Navbar from "../../components/Navbar"
import { useRouter } from "next/router";



const FlightResultsPage = () => {
    const router = useRouter();
    const { query } = router.query;
    const {departDate, from, to, arriveDate, passengers} = router.query;

    return (
        <>
            <Navbar />
            

        </>
    )
}

export default FlightResultsPage;