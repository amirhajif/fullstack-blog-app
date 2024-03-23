import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        const err = new Error()
        err.statusCode = 401;
        err.message = 'Unauthorizedß';
        next(err)
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            next(err)
        }
        req.user = user;
        next()
    })
}
