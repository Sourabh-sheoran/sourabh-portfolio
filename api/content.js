import { getDbData } from '../server/db.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const dbData = getDbData();
    return res.status(200).json(dbData.content);
  } catch (error) {
    console.error('Error in Vercel content function:', error);
    return res.status(500).json({ error: 'Failed to retrieve portfolio content.' });
  }
}
