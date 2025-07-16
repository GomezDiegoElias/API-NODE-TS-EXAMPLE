import type { Role } from "../../domain/Role";

export interface UserRequest {
    name: string;
    email: string;
    password: string;
    role: Role;
}
