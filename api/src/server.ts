// dear Reader and maintainer,
// At first Only God and I know how this Code is running.
// Now, Only God knows how this code is still running
// so if you tried to optimize this code, and failed,
// please, update the following counter:

// total_optimization_attempts: 1
// total hours wasted here: 69
// total_optimization_success: 0

import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import bodyparser from 'body-parser';
import UserRouter from './handlers/Users';
import picRouter from './handlers/Picture';
import FamilyRouter from './handlers/Family';

dotenv.config();
const app = express();
const port = config.PORT;

app.use(bodyparser.json());

app.get('/', (_req, res) => {
	res.send(`
		<h1>NeverLost Api v0</h1>
		<h2>Welcome to the API</h2>
		<h2>Under construction</h2>
		`);
});

UserRouter(app);
picRouter(app);
FamilyRouter(app);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

export default app;
