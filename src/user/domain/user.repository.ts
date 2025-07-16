import type { User } from "./user";

export interface UserRepository {

    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
    update(user: User): Promise<void>;
    delete(id: number): Promise<void>;

}