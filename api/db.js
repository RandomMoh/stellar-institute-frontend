import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

let sql;

export function getDb() {
  if (!sql) {
    sql = neon(process.env.DATABASE_URL);
  }
  return sql;
}

export async function ensureTables() {
  const db = getDb();

  await db`
    CREATE TABLE IF NOT EXISTS announcements (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      body TEXT,
      type VARCHAR(20) DEFAULT 'both',
      priority VARCHAR(20) DEFAULT 'normal',
      link_url VARCHAR(500),
      link_text VARCHAR(100),
      image_url TEXT,
      is_active BOOLEAN DEFAULT true,
      start_date DATE,
      end_date DATE,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(150)
    )
  `;

  await db`
    CREATE TABLE IF NOT EXISTS website_images (
      id SERIAL PRIMARY KEY,
      placeholder_key VARCHAR(100) NOT NULL UNIQUE,
      image_url TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  const existingAdmin = await db`SELECT id FROM admin_users WHERE username = 'admin'`;
  if (existingAdmin.length === 0) {
    const defaultPass = process.env.ADMIN_DEFAULT_PASS;
    if (!defaultPass) {
      console.warn('WARNING: ADMIN_DEFAULT_PASS env var not set. Skipping admin user seed.');
      return;
    }
    const hashed = await bcrypt.hash(defaultPass, 12);
    await db`
      INSERT INTO admin_users (username, password, name)
      VALUES ('admin', ${hashed}, 'Admin')
    `;
  }
}
