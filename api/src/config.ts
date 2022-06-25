import dotenv from 'dotenv';

dotenv.config();

type ConfigType = {
	PORT: number
	BCRYPT_SALT: string
	BCRYPT_ROUNDS: number
	JWT_SECRET: string

}

const config:ConfigType = {
	PORT:parseInt(process.env.PORT as string) | 3000,
	BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS as string),
	BCRYPT_SALT: process.env.BCRYPT_SALT as string,
	JWT_SECRET: process.env.JWT_SECRET as string,
};
export default config;