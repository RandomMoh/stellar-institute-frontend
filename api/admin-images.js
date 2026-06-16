import { getDb, ensureTables } from './db.js';
import jwt from 'jsonwebtoken';

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(auth.slice(7), process.env.JWT_SECRET || 'stellar-cms-secret-key-2026');
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  await ensureTables();
  const db = getDb();

  try {
    if (req.method === 'GET') {
      const rows = await db`SELECT * FROM website_images`;
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const user = verifyToken(req);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const { placeholder_key, image_url } = req.body;
      if (!placeholder_key || !image_url) {
        return res.status(400).json({ error: 'Key and image URL required' });
      }

      const rows = await db`
        INSERT INTO website_images (placeholder_key, image_url)
        VALUES (${placeholder_key}, ${image_url})
        ON CONFLICT (placeholder_key) DO UPDATE
        SET image_url = EXCLUDED.image_url, updated_at = NOW()
        RETURNING *
      `;
      return res.status(200).json(rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Admin images error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
