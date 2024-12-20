import express from "express";
import * as auth from "../controllers/authControllers.js";
import { authenticated } from "../middleware/auth.js";

const router = express.Router();

// '/auth'

router.post('/register', auth.register);
router.get('/login');
router.post('/login', auth.login);

// router.post('/login', authenticated, auth.login);



export default router;