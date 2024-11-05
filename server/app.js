import express from "express";
import cors from "cors";

import authRouter from "./routes/authRoute.js";
import db from "./db.js";

const app = express();
const port = 5000;

// connect to the database
db.connect()
    .then(() => console.log('Connected to the database!'))
    .catch(err => console.error('Connection error', err.stack));


app.use(express.json());
app.use(cors());

// ROUTES
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);    
});