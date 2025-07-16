import { DataSource } from "typeorm";
import { UserEntity } from "../../../user/infrastructure/entity/user.entity.js";
import config from "../../../../config.js";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "api_node_ts_example",
    synchronize: process.env.NODE_ENV === "development", // Solo en desarrollo
    logging: process.env.NODE_ENV === "development",
    entities: [UserEntity],
    migrations: [],
    subscribers: [],
});

// Función para inicializar la conexión
export async function initializeDatabase(): Promise<void> {
    try {
        await AppDataSource.initialize();
        console.log("✅ Database connection established");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        throw error;
    }
}

// Función para cerrar la conexión
export async function closeDatabase(): Promise<void> {
    try {
        await AppDataSource.destroy();
        console.log("✅ Database connection closed");
    } catch (error) {
        console.error("❌ Error closing database connection:", error);
    }
} 