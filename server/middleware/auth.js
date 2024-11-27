import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export async function authenticated(req, res, next) {
    // console.log(req.headers.authorization.replace(/"/g, ''));
    
    const accessToken = req.headers.authorization.replace(/"/g, '')

    if(!accessToken){
        return res.status(401).json({message: 'Access token missing.'});
    }

    try {
        // if the verification fails, throws an error and goes to the catch
        const decodedToken = jwt.verify(accessToken, process.env.accessTokenSecret)

        // console.log(decodedToken);
        
        req.user = {id: decodedToken.userId};
        req.accessToken = {value: accessToken, exp: decodedToken.exp}; // creates req.accessToken
        next();
        
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