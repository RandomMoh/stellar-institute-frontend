import { neon } from '@neondatabase/serverless';

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
}
