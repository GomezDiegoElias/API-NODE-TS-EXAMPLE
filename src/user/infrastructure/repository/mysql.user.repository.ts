import type { User } from "../../domain/user";
import type { UserRepository } from "../../domain/user.repository";
import { UserEntity } from "../entity/user.entity.js";
import { UserMapper } from "../mapper/user.mapper.js";
import { AppDataSource } from "../../../shared/infrastructure/database/typeorm.config.js";

export class MysqlUserRepository implements UserRepository {
    
    private userRepository = AppDataSource.getRepository(UserEntity);

    async findAll(): Promise<User[]> {
        const entities = await this.userRepository.find();
        return UserMapper.toDomainList(entities);
    }

    async findById(id: string): Promise<User | null> {
        const entity = await this.userRepository.findOne({ where: { id } });
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const entity = await this.userRepository.findOne({ where: { email } });
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async save(user: User): Promise<User> {
        const entity = UserMapper.toEntity(user);
        const savedEntity = await this.userRepository.save(entity);
        return UserMapper.toDomain(savedEntity);
    }

    async update(user: User): Promise<void> {
        const entity = UserMapper.toEntity(user);
        await this.userRepository.save(entity);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}