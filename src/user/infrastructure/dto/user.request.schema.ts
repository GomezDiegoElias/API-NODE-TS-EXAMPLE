import { object, string, minLength, email, regex, pipe } from 'valibot';
import type { InferOutput } from 'valibot';
import type { Role } from '../../domain/Role';

// Expresión regular para nombre: mínimo 2 caracteres, solo letras y espacios
const nameRegex = /^[a-zA-Z\s]{2,}$/;

export const UserRequestSchema = object({
  name: pipe(string(), minLength(5, 'Name must be at least 2 characters long'), regex(nameRegex, 'Name must contain only letters and spaces')),
  email: pipe(string(), email('Invalid email format')),
  password: pipe(string(), minLength(6, 'Password must be at least 6 characters long')),
  // Si quieres validar el enum Role, puedes usar a futuro: enumType([Role.USER, Role.ADMIN, ...])
  role: string()
});

export type UserRequestInput = InferOutput<typeof UserRequestSchema>; 