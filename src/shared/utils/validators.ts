export class Validators {
    
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPassword(password: string): boolean {
        // Mínimo 6 caracteres
        return password.length >= 6;
    }

    static isValidName(name: string): boolean {
        // Mínimo 2 caracteres, solo letras y espacios
        const nameRegex = /^[a-zA-Z\s]{2,}$/;
        return nameRegex.test(name);
    }

    static validateUserData(data: { name?: string; email?: string; password?: string }): string[] {
        const errors: string[] = [];

        if (!data.name || !Validators.isValidName(data.name)) {
            errors.push("Name must be at least 2 characters long and contain only letters");
        }

        if (!data.email || !Validators.isValidEmail(data.email)) {
            errors.push("Invalid email format");
        }

        if (!data.password || !Validators.isValidPassword(data.password)) {
            errors.push("Password must be at least 6 characters long");
        }

        return errors;
    }
} 