import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import bodyparser from 'body-parser';

dotenv.config();
const app = express();
const port = config.port;

app.use(bodyparser.json());

app.get('/', (_req, res) => {
	res.send(`
		<h1>NeverLost Api v0</h1>
		<h2>Welcome to the API</h2>
		<h2>Under construction</h2>
		`)
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

export default app;