import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// Ensure environment variables are defined, otherwise throw an error
if (!process.env.COSMOS_DB_URI || !process.env.COSMOS_DB_DATABASE || !process.env.COSMOS_DB_CONTAINER) {
  throw new Error('Missing environment variables for Cosmos DB');
}

// Type assertion to ensure the values are strings
const client = new MongoClient(process.env.COSMOS_DB_URI as string);

// Function to fetch data from Cosmos DB
const getMongoData = async () => {
  await client.connect();
  const database = client.db(process.env.COSMOS_DB_DATABASE as string); // Type assertion
  const collection = database.collection(process.env.COSMOS_DB_CONTAINER as string); // Type assertion
  const data = await collection.find().toArray();
  return data;
};

// Next.js API route handler
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
