const express = require('express');
const axios = require('axios');

const app = express();

app.get('/api/accomodation', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(`https://api.hotels.com/v1/search`, {
            params: {
                query: city,
                apiKey: 'YOUR_API_KEY'
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data from Hotels.com' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});