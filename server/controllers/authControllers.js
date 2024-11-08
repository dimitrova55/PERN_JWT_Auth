import db from "../db.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * POST register 
 */
export const register = async (req, res) => {
    try {
        // 1. Destructure the req.body
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(422).json({message: "Please fill in all fields."});
        }

        // 2. Check if the user already exists
        const result = await db.query({
            text: `SELECT * FROM users WHERE email = $1`,
            values: [email]
        });

        if(result.rowCount > 0) {
            return res.status(409).json({message: "User with the same email already exists!"});
        }

        // 3. Bcrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Insert the new user inside the database
        const newUser = await db.query({
            text: `
                INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3) RETURNING *`,
            values: [name, email, hashedPassword]
        });

        res.status(201).json({
            message: "User registered!",
            user: newUser.rows[0].email
        });


        // 5. Generate JWT token
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


/**
 * POST login 
 */
export const login = async (req, res) => {
    try {
        // 1. Destructure the req.body
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(422).json({message: "Please fill in all fields."});
        }

        // 2. Check if the user already exists
        const user = await db.query({
            text: `SELECT * FROM users WHERE email = $1`,
            values: [email]
        });

        if(user.rowCount <= 0) {
            return res.status(409).json({message: "Incorrect email or password!"});
        }

        // 3. Bcrypt the password
        const storedPassword = user.rows[0].password;

        const isMatch = await bcrypt.compare(password, storedPassword);

        if(!isMatch) {
            return res.status(401).json({message: "Incorrect password."});
        }

        // 5. Generate JWT token
        const accessToken = jwt.sign(
            {userId: user.id},
            process.env.accessTokenSecret,
            {subject: 'accessApi', expiresIn: '30m'}
        );

        return res.status(200).json({
            user: user.rows[0].email,
            accessToken: accessToken,
        });

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}