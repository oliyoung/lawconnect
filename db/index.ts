import { drizzle } from 'drizzle-orm/libsql';

const dbFileName = process.env.DB_FILE_NAME;
if (!dbFileName) {
    throw new Error("DB_FILE_NAME is not set");
}

const db = drizzle(dbFileName);
export default db;