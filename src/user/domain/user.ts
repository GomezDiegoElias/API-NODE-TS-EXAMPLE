import type { UserRequest } from "../infrastructure/dto/user.request";
import { Role } from "./Role";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { UserRequestSchema } from "../infrastructure/dto/user.request.schema";
import { parse } from "valibot";

export class User {

    public id: string;
    public name: string;
    public email: string;
    public password: string;
    public role: Role;

    constructor(id: string, name: string, email: string, password: string, role: Role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Factory method para creacion

    static async create(createUserDto: UserRequest): Promise<User> {
        // Validación usando Valibot
        try {
            parse(UserRequestSchema, createUserDto);
        } catch (error: any) {
            if (error.issues) {
                //throw new Error(error.issues.map((issue: any) => issue.message).join(", "));
                const messages = error.issues.map((issue: any) => issue.message);
                /* const err = new Error('Validation failed');
                (err as any).validationMessages = messages;
                throw err; */
                throw { validationMessages: messages, message: "Validation failed" };
            }
            throw error;
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
        return new User(
            randomUUID(),
            createUserDto.name,
            createUserDto.email,
            hashedPassword,
            createUserDto.role || Role.USER
        );
    }
    
}

/* export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: Role,
    ) {}
} */