import type { UserService } from "../application/user.service";
import type { Request, Response } from "express";
import type { UserRequest } from "./dto/user.request";
import { Role } from "../domain/Role";
import { 
    UserAlreadyExistsException, 
    InvalidCredentialsException, 
    UserNotFoundException,
    ValidationException 
} from "../domain/exceptions/user.exceptions.js";

export class UserController {

    constructor(private readonly userService: UserService) {}

    async register(req: Request, res: Response) {
        try {
            const userRequest: UserRequest = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role || Role.USER
            };

            const user = await this.userService.register(userRequest);
            
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            if (error instanceof UserAlreadyExistsException) {
                res.status(409).json({
                    error: "User already exists",
                    message: error.message
                });
            } else if (error instanceof ValidationException) {
                res.status(400).json({
                    error: "Validation failed",
                    message: error.message
                });
            } else {
                res.status(500).json({
                    error: "Internal server error",
                    message: "Something went wrong"
                });
            }
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({
                    error: "Missing credentials",
                    message: "Email and password are required"
                });
            }

            const result = await this.userService.login(email, password);
            
            res.status(200).json({
                message: "Login successful",
                token: result.token,
                user: {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    role: result.user.role
                }
            });
        } catch (error) {
            if (error instanceof InvalidCredentialsException) {
                res.status(401).json({
                    error: "Invalid credentials",
                    message: error.message
                });
            } else {
                res.status(500).json({
                    error: "Internal server error",
                    message: "Something went wrong"
                });
            }
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            
            res.status(200).json({
                users: users.map(user => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }))
            });
        } catch (error) {
            res.status(500).json({
                error: "Failed to fetch users",
                message: "Something went wrong"
            });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            
            if (!userId) {
                return res.status(400).json({
                    error: "Missing user ID",
                    message: "User ID is required"
                });
            }
            
            const user = await this.userService.getUserById(userId);
            
            // El servicio ya maneja la excepción UserNotFoundException

            res.status(200).json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                res.status(404).json({
                    error: "User not found",
                    message: error.message
                });
            } else {
                res.status(500).json({
                    error: "Failed to fetch user",
                    message: "Something went wrong"
                });
            }
        }
    }
}