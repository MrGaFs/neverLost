import Feeds from '../models/feed';
import express from 'express';
import jwt from 'jsonwebtoken';
import jwtAuth from '../middleware/jwtatuh';
import config from '../config';
import Joi from 'joi';

const fed = new Feeds();

const getAllFeed = async (req: express.Request, res: express.Response) => {
    try {
        const ret = await fed.getAllFeed();
        if (!ret)
            throw new Error('No Feed');
        res.status(200).json(ret);
    }
    catch (e) {
        res.status(500).send((e as Error).message);
    }
}

const createFeed = async (req: express.Request, res: express.Response) => {

}

const getFeed = async (req: express.Request, res: express.Response) => {
    try {
        const ret = await fed.getFeed(parseInt(req.params.id as string));
        if (!ret)
            throw new Error('No Feed');
        res.status(200).json(ret);
    }
}

const FeedRouter = (app: express.Application) => {
    app.get('/feed', getAllFeed);
    app.post('/feed', createFeed);
    app.get('/feed/:id', getFeed)
}

export default FeedRouter;