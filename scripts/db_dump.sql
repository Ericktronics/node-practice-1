-- Create schema if it doesn't exist
CREATE DATABASE IF NOT EXISTS `node-practice-1`;

-- Use the schema
USE `node-practice-1`;

-- Create tbuser_main table
CREATE TABLE IF NOT EXISTS `tbuser_main` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data into tbuser_main
INSERT INTO `tbuser_main` 
(`first_name`, `last_name`, `email`, `password_hash`, `is_active`)
VALUES
('Pauline', 'Santos', 'pauline.santos@example.com', '$2a$11$g93EK37wy.1SbbfxF7OR/eS0o04SD.iaCI1HimrwrgqJKzpdXIHqK', 1),
('Henrick', 'Peralta', 'henrick.peralta@example.com', '$2a$11$6xjKPrZH5GmHa6fevCBHpeh4WWJdptzZg91IyLlo7LPRFsMJgc3Qq', 1),
('Marie', 'Lopez', 'marie.lopez@example.com', '$2a$11$lO/3GvhjA3iLdgOyNpRKjeR/lt2YjipMQSCNbNqSieNMVEqPtgrWS', 1);