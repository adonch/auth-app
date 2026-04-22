// import { app } from './createServer';
import express from 'express';
import cookieParser from 'cookie-parser';
import { authController } from '../controllers/auth.controller.js';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const authRouter = new express.Router();
export const userRouter = new express.Router();

authRouter.post('/registration', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/activation/:activationToken', authController.activate);
authRouter.get('/refresh', cookieParser(), authController.refresh);
authRouter.post('/logout', authController.logout);
userRouter.get('/', authMiddleware, userController.getAllUsers);
authRouter.post('/change-password', authController.changePassword);
