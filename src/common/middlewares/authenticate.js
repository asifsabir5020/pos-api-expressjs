import jwt from 'jsonwebtoken';
import { jwtSettings } from '../../config/config';

export const authenticate = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, jwtSettings.secret, (err, user) => {
            if (err) {
                // return res.sendStatus(403);
                return res.status(403).send({ error: `unauthenticated user` });
            }
            req.user = user;
            console.log('user', user);
            next();
        });
    } else {
        // res.sendStatus(401);
        return res.status(401).send({ error: `token was not sent` });
    }
};