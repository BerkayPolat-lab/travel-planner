import express, {json} from "express"
import dotenv from "dotenv";
import cors from "cors";
import { getJson } from "serpapi";

dotenv.config();

const app = express();
const PORT = 5001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(json()); 


// Proxy Route to fetch data from SerpApi
app.get("/api/flights", async (req, res) => {
    const { departDate, arriveDate, from, to, passengers } = req.query;

    // eslint-disable-next-line no-undef
    const apiKey = process.env.GOOGLE_FLIGHTS_API;
    console.log("Api Key: ", apiKey)
    try {
        const response = await getJson({
            engine: "google_flights",
            departure_id: from,
            arrival_id: to,
            api_key: apiKey,
            adults: passengers,
            outbound_date: departDate,
            return_date: arriveDate
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }
        res.json(response);
    } catch (error) {
        console.error("Error fetching flights:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
