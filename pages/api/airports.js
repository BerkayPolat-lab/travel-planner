import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) return res.status(200).json([]);

  try {
    const client = await clientPromise;
    const db = client.db("airportsDB");

    // Search airports by name or IATA code (case insensitive)
    const airports = await db.collection("airports").find(
        {$or: [
          { Name: { $regex: query, $options: "i" } },
          { IATA: { $regex: query, $options: "i" } }
        ]
      })
      .limit(5)
      .toArray();

    console.log("airports", airports);
    res.status(200).json(airports);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
        console.error("Error fetching airports:", error);
      }
      res.status(500).json({ message: "Internal server error" });
  }
}
