-- phpMyAdmin SQL Dump
-- version 5.2.1deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Apr 29, 2025 alle 07:27
-- Versione del server: 8.4.5
-- Versione PHP: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `access_app`
--

CREATE TABLE `access_app` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `userId` varchar(255) NOT NULL,
  `applicationTenantDBId` varchar(255) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `applicationFunctionalData` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `application`
--

CREATE TABLE `application` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `code` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `application`
--

INSERT INTO `application` (`id`, `code`, `description`) VALUES
('4ba98b76-1b9d-11f0-bc45-4cd717941b8c', 'APP002', 'HOOKLIFT');

-- --------------------------------------------------------

--
-- Struttura della tabella `application_tenant_db`
--

CREATE TABLE `application_tenant_db` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `applicationId` varchar(255) NOT NULL,
  `companyId` varchar(255) NOT NULL,
  `database_connection` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `company`
--

CREATE TABLE `company` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `description` text NOT NULL,
  `cell` text,
  `cfpiva` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `password_reset`
--

CREATE TABLE `password_reset` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `userId` varchar(255) NOT NULL,
  `token` text NOT NULL,
  `used` tinyint(1) NOT NULL DEFAULT '0',
  `expiresAt` timestamp NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL DEFAULT (uuid()),
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `picture` text,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `companyId` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `picture`, `isActive`, `createdAt`, `updatedAt`, `role`, `companyId`, `email`, `password`) VALUES
('ed4a0a82-1b8d-11f0-bc45-4cd717941b8c', 'Riccardo', 'Meggiolaro', NULL, 1, '2025-04-17 13:14:43', '2025-04-17 13:14:43', 'ADMIN', NULL, 'riccardo.meggiolaro@baron.it', '$2b$10$guEA4WvsiIUTP7nl.sq/XuWMdAERAaUAzdidIHRf7YXqgYQEYZ4tm');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `access_app`
--
ALTER TABLE `access_app`
  ADD PRIMARY KEY (`id`),
  ADD KEY `access_app_userId_idx` (`userId`),
  ADD KEY `access_app_applicationTenantDBId_idx` (`applicationTenantDBId`);

--
-- Indici per le tabelle `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `application_tenant_db`
--
ALTER TABLE `application_tenant_db`
  ADD PRIMARY KEY (`id`),
  ADD KEY `application_tenant_db_applicationId_idx` (`applicationId`),
  ADD KEY `application_tenant_db_companyId_idx` (`companyId`);

--
-- Indici per le tabelle `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `password_reset`
--
ALTER TABLE `password_reset`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_reset_userId_idx` (`userId`);

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_companyId_idx` (`companyId`);

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `access_app`
--
ALTER TABLE `access_app`
  ADD CONSTRAINT `access_app_applicationTenantDBId_fkey` FOREIGN KEY (`applicationTenantDBId`) REFERENCES `application_tenant_db` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `access_app_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `application_tenant_db`
--
ALTER TABLE `application_tenant_db`
  ADD CONSTRAINT `application_tenant_db_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `application` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `application_tenant_db_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `password_reset`
--
ALTER TABLE `password_reset`
  ADD CONSTRAINT `password_reset_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
