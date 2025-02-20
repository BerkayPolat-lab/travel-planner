import axios from "axios";

const flightResults = async (from, to, departDate, arriveDate, passengers) => {
    // eslint-disable-next-line no-undef
    try {
        const response = await axios.get("http://localhost:5001/api/flights", {
            params: {
                departDate,
                from,
                to, 
                arriveDate,
                passengers,
            }
        })
        console.log(response.data);
    } catch (error) {
        console.log("Error fetching flight data:", error);
    }

}

export default flightResults;