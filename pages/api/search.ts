import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB!;
const client = new MongoClient(uri);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const keyword = req.query.keyword?.toString().toLowerCase() || '';

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('csvData');

    const results = await collection
      .find({
        $or: [
          { home_team: { $regex: keyword, $options: 'i' } },
          { away_team: { $regex: keyword, $options: 'i' } },
        ],
      })
      .limit(20)
      .toArray();

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
};

export default handler;
