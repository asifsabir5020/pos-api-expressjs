import jwt from 'jsonwebtoken';
import { jwtSettings } from '../../config/config';
import { User } from './../../api/resources/User/Model';

export const authenticate = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        try{
            const user = jwt.verify(token, jwtSettings.secret);
            req.user = await User.findOne({email:user.email});
            next();

        }catch(e){
             return res.status(401).send({ error: `unauthenticated user` });
        }
    } else {
        return res.status(401).send({ error: `unauthenticated user / login required` });
    }
};