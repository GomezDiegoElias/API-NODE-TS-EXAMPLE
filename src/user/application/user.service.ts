import { User } from "../domain/user";
import type { UserRepository } from "../domain/user.repository";
import type { UserRequest } from "../infrastructure/dto/user.request";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config.js";
import { 
    UserAlreadyExistsException, 
    InvalidCredentialsException, 
    UserNotFoundException,
    ValidationException 
} from "../domain/exceptions/user.exceptions.js";

export class UserService {

    constructor(private readonly userRepository: UserRepository) {}

    async register(userRequest: UserRequest): Promise<User> {

        const userExists = await this.userRepository.findByEmail(userRequest.email);

        if (userExists) {
            throw new UserAlreadyExistsException(userRequest.email);
        }

        try {
            const user = await User.create(userRequest);
            return this.userRepository.save(user);
        } catch (error: any) {
            if (error instanceof ValidationException) {
                throw error;
            }
            // Si el error tiene validationMessages, pásalos al ValidationException
            if (error && typeof error === 'object' && 'validationMessages' in error) {
                throw new ValidationException("Invalid user data", (error as any).validationMessages);
            }
            throw new ValidationException("Invalid user data");
        }

    }

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await this.userRepository.findByEmail(email);
        
        if (!user) {
            throw new InvalidCredentialsException();
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        return { user, token };
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll();
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.userRepository.findById(id);
        
        if (!user) {
            throw new UserNotFoundException(id);
        }
        
        return user;
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new UserNotFoundException(id);
        }
        await this.userRepository.delete(id);
    }
}