import express from "express";
import * as user from "../controllers/userControllers.js";
import { authenticated } from "../middleware/auth.js";

const router = express.Router();

// '/user'

router.get('/dashboard', authenticated, user.dashboard);


export default router;