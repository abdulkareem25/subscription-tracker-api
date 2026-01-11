import { config } from "dotenv";

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

config({ path: envFile })

export const { PORT, NODE_ENV, MONGO_URI } = process.env;