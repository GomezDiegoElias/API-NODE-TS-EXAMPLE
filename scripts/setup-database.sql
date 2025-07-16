-- Script para crear la base de datos
-- Ejecutar en MySQL Workbench o línea de comandos

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS api_node_ts_example;

-- Usar la base de datos
USE api_node_ts_example;

-- Verificar que la base de datos existe
-- SHOW DATABASES;

-- SELECT * FROM users;

-- Nota: TypeORM creará automáticamente las tablas cuando ejecutes la aplicación
-- con la opción synchronize: true en desarrollo 