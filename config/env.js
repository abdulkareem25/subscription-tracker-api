import { config } from "dotenv";

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

config({ path: envFile })

export const { PORT, NODE_ENV, DB_URI, JWT_SECRET } = process.env;