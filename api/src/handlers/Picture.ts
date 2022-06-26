import Picture from '../models/Picture';
import express from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.filename}.jpg`);
	}
});

const mult = multer({ storage: storage });
const pic = new Picture();

const getPicture = async (req: express.Request, res: express.Response) => {
	try {
		const ret = await pic.getPicture(parseInt(req.params.id as string));
		res.status(200).json(ret);
	} catch (e) {
		res.status(500).send((e as Error).message);
	}
};

const addPicture = async (req: express.Request, res: express.Response) => {
	try {
		if (!req.file)
			throw new Error('No file');
		const ret = await pic.createPicture({
			user_id: req.body.id,
			path: req.file?.path as string
		});
		res.status(200).json(ret);
	} catch (e) {
		res.status(500).send((e as Error).message);
	}
};
const updatePicture = async (req: express.Request, res: express.Response) => {
	try {
		if (!(req.body.id && req.body.path))
			throw new Error('No id or path');
		const ret = await pic.updatePicture(req.body.id, req.body.path);
		res.status(200).json(ret);
	} catch (e) {
		res.status(500).send((e as Error).message);
	}
};

const picRouter = (app: express.Application) => {
	app.get('/picture/:id', getPicture);
	app.post('/picture', mult.single('picture'), addPicture);
	app.put('/picture', updatePicture);
};
export default picRouter;
