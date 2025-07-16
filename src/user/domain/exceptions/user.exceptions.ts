export class UserAlreadyExistsException extends Error {
    constructor(email: string) {
        super(`User with email ${email} already exists`);
        this.name = 'UserAlreadyExistsException';
    }
}

export class InvalidCredentialsException extends Error {
    constructor() {
        super('Invalid email or password');
        this.name = 'InvalidCredentialsException';
    }
}

export class UserNotFoundException extends Error {
    constructor(id?: string) {
        const message = id ? `User with id ${id} not found` : 'User not found';
        super(message);
        this.name = 'UserNotFoundException';
    }
}

export class ValidationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationException';
    }
} 