import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// Ensure that environment variables are defined
const COSMOS_DB_URI = process.env.COSMOS_DB_URI;
const COSMOS_DB_DATABASE = process.env.COSMOS_DB_DATABASE;
const COSMOS_DB_CONTAINER = process.env.COSMOS_DB_CONTAINER;

if (!COSMOS_DB_URI || !COSMOS_DB_DATABASE || !COSMOS_DB_CONTAINER) {
  throw new Error('Missing required environment variables');
}

const client = new MongoClient(COSMOS_DB_URI);

// Function to fetch data from MongoDB
const getMongoData = async () => {
  await client.connect();
  const database = client.db(COSMOS_DB_DATABASE);
  const collection = database.collection(COSMOS_DB_CONTAINER);
  const data = await collection.find().toArray();
  return data;
};

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await getMongoData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from Cosmos DB' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
