export const config = {
    jwtSecret: process.env.JWT_SECRET as string || "My_Secret_Key",
    port: process.env.PORT as string || "3000",
    database: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "3306"),
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_DATABASE || "api_node_ts_example",
    }
}

export default config;