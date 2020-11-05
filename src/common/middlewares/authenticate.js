import jwt from 'jsonwebtoken';
import { jwtSettings } from '../../config/config';
import { User } from './../../api/resources/User/Model';

export const authenticate = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        try{
            const decodedUser = jwt.verify(token, jwtSettings.secret);
            const user = await User.findOne({email:decodedUser.email});
            if(user){
                if(!user.status){
                    return res.status(401).send({ error: `unauthenticated user / disabled user` });
                }
            }
            req.user = user;
            next();
        }catch(e){
            return res.status(401).send({ error: `unauthenticated user` });
        }
    } else {
        return res.status(401).send({ error: `unauthenticated user / login required` });
    }
};