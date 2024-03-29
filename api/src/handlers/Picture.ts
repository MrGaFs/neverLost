import Picture from '../models/Picture';
import express from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, `${req.body.user_id}${file.originalname}`);
	}
});

const mult = multer({ storage: storage });
const pic = new Picture();

const getPicture = async (req: express.Request, res: express.Response) => {
	try {
		const ret = await pic.getPicture(parseInt(req.params.id as string));
		if(!ret)
			throw new Error('No picture');
		res.status(200).sendFile(path.resolve(ret.path));
	} catch (e) {
		res.status(500).send((e as Error).message);
	}
};

const addPicture = async (req: express.Request, res: express.Response) => {
	try {
		if (!req.file)
			throw new Error('No file');
		const ret = await pic.createPicture({
			user_id: parseInt(req.body.user_id),
			path: req.file?.path as string
		});
		res.status(200).json(ret);
	} catch (e) {
		res.status(500).send((e as Error).message);
	}
};
const picRouter = (app: express.Application) => {
	app.get('/picture/:id', getPicture);
	app.post('/picture', mult.single('picture'), addPicture);
};
export default picRouter;
