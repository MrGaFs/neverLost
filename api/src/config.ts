import dotenv from 'dotenv';

dotenv.config();
const env = process.env.ENV || 'dev';

const config = {
	port:parseInt(process.env.PORT as string) | 3000,
}
export default config;