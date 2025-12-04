import { createPool } from '@vercel/postgres';

const pool = createPool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
});

async function seed() {
  await pool.sql`CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )`;

  await pool.sql`INSERT INTO todos (text) VALUES ('Buy milk'), ('Walk dog') ON CONFLICT DO NOTHING`;
}

seed()
  .then(() => console.log('Seed complete'))
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  });
