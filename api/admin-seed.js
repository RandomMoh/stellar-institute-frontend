import { getDb, ensureTables } from './db.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Protect with seed secret
  const { secret, username, password, name } = req.body;

  if (secret !== (process.env.SEED_SECRET || 'stellar-seed-2026')) {
    return res.status(403).json({ error: 'Invalid seed secret' });
  }

  try {
    await ensureTables();
    const db = getDb();

    // Check if user exists
    const existing = await db`SELECT id FROM admin_users WHERE username = ${username}`;
    if (existing.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 12);

    const rows = await db`
      INSERT INTO admin_users (username, password, name)
      VALUES (${username}, ${hashed}, ${name || username})
      RETURNING id, username, name
    `;

    return res.status(201).json({ success: true, user: rows[0] });
  } catch (err) {
    console.error('Seed error:', err);
    return res.status(500).json({ error: 'Failed to seed admin user' });
  }
}
