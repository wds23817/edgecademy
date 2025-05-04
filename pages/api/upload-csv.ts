import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { parse } from 'csv-parse/sync';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'test';

const client = new MongoClient(uri);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { csvText } = req.body;
    if (!csvText) {
      return res.status(400).json({ message: 'No CSV data provided' });
    }
    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    });

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('csvData');

    const result = await collection.insertMany(records);

    res.status(200).json({ insertedCount: result.insertedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
};

export default handler;
