import type { UserRequest } from "../infrastructure/dto/user.request";
import { Role } from "./Role";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { Validators } from "../../shared/utils/validators.js";

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
        // validaciones usando la clase Validators
        const validationErrors = Validators.validateUserData(createUserDto);
        
        if (validationErrors.length > 0) {
            throw new Error(validationErrors.join(", "));
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