import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

const key = config.SECRET_KEY;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        // @ts-ignore
        const token = req.headers.authorization.split(' ')[1];
        const isCustomAuth = token.length < 500;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, `${key}`);
            // @ts-ignore
            req.user = decodedData;
        } else {
            decodedData = jwt.decode(token);
            // @ts-ignore
            req.user = decodedData;
        }
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Auth error' });
    }
};
