export const authorization = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({
                error: 'No tiene autorización'
            });
        }

        if (req.user.role != role) {
            return res.status(403).send({
                error: 'No tiene los permisos suficientes'
            });
        }

        next();
    }
}