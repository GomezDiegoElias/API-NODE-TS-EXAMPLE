import { Router } from "express";
import type { UserController } from "./user.controller";

// Middleware para manejar errores en rutas asíncronas
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export function createUserRoutes(userController: UserController): Router {
    const router = Router();

    // POST /api/users/register
    router.post('/register', asyncHandler(async (req: any, res: any) => {
        await userController.register(req, res);
    }));

    // POST /api/users/login
    router.post('/login', asyncHandler(async (req: any, res: any) => {
        await userController.login(req, res);
    }));

    // GET /api/users
    router.get('/', asyncHandler(async (req: any, res: any) => {
        await userController.getUsers(req, res);
    }));

    // GET /api/users/:id (debe ir al final para no capturar rutas específicas)
    router.get('/:id', asyncHandler(async (req: any, res: any) => {
        await userController.getUserById(req, res);
    }));

    // DELETE /api/users/:id
    router.delete('/:id', asyncHandler(async (req: any, res: any) => {
        await userController.deleteUser(req, res);
    }));

    return router;
} 