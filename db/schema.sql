DROP DATABASE IF EXISTS marketplace_db;
CREATE DATABASE marketplace_db;
USE marketplace_db;

-- Create the user table
CREATE TABLE IF NOT EXISTS `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`)
);

-- Create the farmer table
CREATE TABLE IF NOT EXISTS `farmer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `farm_name` VARCHAR(255) NOT NULL, -- Added farm_name column
    `description` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `user_id` INTEGER,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

-- Create the produce table
CREATE TABLE IF NOT EXISTS `produce` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` DECIMAL NOT NULL,
    `availability` TINYINT(1),
    `filename` VARCHAR(255),
    `farmer_id` INTEGER,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`farmer_id`) REFERENCES `farmer` (`id`)
);

-- Create the review table
CREATE TABLE IF NOT EXISTS `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment` VARCHAR(255) NOT NULL,
    `rating` INTEGER NOT NULL,
    `user_id` INTEGER,
    `produce_id` INTEGER,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    FOREIGN KEY (`produce_id`) REFERENCES `produce` (`id`)
);
