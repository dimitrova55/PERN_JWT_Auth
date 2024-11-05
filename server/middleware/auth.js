import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export async function authenticated(req, res, next) {
    const accessToken = req.header["token"]

    if(!accessToken){
        return res.status(401).json({message: 'Access token missing.'});
    }

    try {
        // if the verification fails, throws an error and goes to the catch
        const decodedToken = jwt.verify(accessToken, process.env.accessTokenSecret)

        req.user = {id: decodedToken.userId}
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({message: 'Access token expired.'})
        } else if(error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({message: 'Access token invalid'})
        } else {
            return res.status(500).json({message: error.message})
        }
    }
}