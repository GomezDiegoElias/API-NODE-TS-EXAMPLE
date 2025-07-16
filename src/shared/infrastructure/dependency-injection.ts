import { UserController } from "../../user/infrastructure/user.controller.js";
import { UserService } from "../../user/application/user.service.js";
import { MysqlUserRepository } from "../../user/infrastructure/repository/mysql.user.repository.js";

// Repository instances
const userRepository = new MysqlUserRepository();

// Service instances
const userService = new UserService(userRepository);

// Controller instances
const userController = new UserController(userService);

export {
    userController,
    userService,
    userRepository
}; 