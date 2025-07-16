import { User } from "../../domain/user.js";
import { UserEntity } from "../entity/user.entity.js";
import { Role } from "../../domain/Role.js";

export class UserMapper {
    
    static toDomain(entity: UserEntity): User {
        return new User(
            entity.id,
            entity.name,
            entity.email,
            entity.password,
            entity.role
        );
    }

    static toEntity(domain: User): UserEntity {
        const entity = new UserEntity();
        entity.id = domain.id;
        entity.name = domain.name;
        entity.email = domain.email;
        entity.password = domain.password;
        entity.role = domain.role;
        return entity;
    }

    static toDomainList(entities: UserEntity[]): User[] {
        return entities.map(entity => this.toDomain(entity));
    }
}