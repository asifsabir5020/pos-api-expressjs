export const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).send({ error: `user is not authorize / user require permissions` });
        }
        next();
    }
};