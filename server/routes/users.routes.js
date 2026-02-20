import { Router } from 'express'
import { clerkAuth } from '../middlewares/auth.middleware.js';
import dotenv from 'dotenv';
import { getCurrentUser } from '../controllers/user.controller.js';


dotenv.config();

const userRoutes = Router()

userRoutes.post('/sync', clerkAuth, getCurrentUser);

export default userRoutes;