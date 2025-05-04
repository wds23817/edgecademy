import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB!;
const client = new MongoClient(uri);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id?.toString() || '';

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('csvData');

    const result = await collection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ message: 'ID not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
};

export default handler;
