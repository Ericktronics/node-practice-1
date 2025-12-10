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
  `role` ENUM('HR_ADMIN', 'PROJECT_ADMIN', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
  `is_active` TINYINT NOT NULL DEFAULT 1,  
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data into tbuser_main
INSERT INTO `tbuser_main` 
(`first_name`, `last_name`, `email`, `password_hash`, `role`, `is_active`)
VALUES
('Pauline', 'Santos', 'pauline.santos@example.com', '$2a$11$g93EK37wy.1SbbfxF7OR/eS0o04SD.iaCI1HimrwrgqJKzpdXIHqK', 'HR_ADMIN', 1),
('Henrick', 'Peralta', 'henrick.peralta@example.com', '$2a$11$6xjKPrZH5GmHa6fevCBHpeh4WWJdptzZg91IyLlo7LPRFsMJgc3Qq', 'PROJECT_ADMIN', 1),
('Marie', 'Lopez', 'marie.lopez@example.com', '$2a$11$lO/3GvhjA3iLdgOyNpRKjeR/lt2YjipMQSCNbNqSieNMVEqPtgrWS', 'MEMBER', 1);

-- Create tbprojects_main table
CREATE TABLE IF NOT EXISTS `tbprojects_main` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `owner_user_id` INT UNSIGNED NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,  
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  KEY `idx_owner_user_id` (`owner_user_id`),
  CONSTRAINT `fk_projects_owner` FOREIGN KEY (`owner_user_id`) REFERENCES `tbuser_main`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional sample data for tbprojects_main
INSERT INTO `tbprojects_main`
(`name`, `description`, `owner_user_id`, `is_active`)
VALUES
('Onboarding Portal', 'Internal onboarding project', 1, 1),
('Customer CRM', 'CRM initiative for customer relations', 2, 1);

-- Project members (many-to-many)
CREATE TABLE IF NOT EXISTS `tbproject_members` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_project_user` (`project_id`, `user_id`),
  KEY `idx_project_id` (`project_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `fk_project_members_project` FOREIGN KEY (`project_id`) REFERENCES `tbprojects_main`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_project_members_user` FOREIGN KEY (`user_id`) REFERENCES `tbuser_main`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Optional sample data for tbproject_members
INSERT INTO `tbproject_members`
(`project_id`, `user_id`)
VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 3);