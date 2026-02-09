import { Client } from 'pg';
import "dotenv/config";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  try {
    console.log("Connecting to:", process.env.DATABASE_URL?.split("@")[1]); // Log host only for safety
    await client.connect();
    console.log("✅ Custom PG Client Connected successfully!");
    const res = await client.query('SELECT NOW()');
    console.log("Current Time:", res.rows[0]);
    await client.end();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

main();
