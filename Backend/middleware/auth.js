import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                res.status(403).json("Token is not valid")
            }
            req.user = payload;
            next();
        })
    } else {
        res.json("you aren't authenticated")
    }
}