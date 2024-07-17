-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 17, 2024 at 07:12 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `internet_plans`
--

-- --------------------------------------------------------

--
-- Table structure for table `internet_plans`
--

DROP TABLE IF EXISTS `internet_plans`;
CREATE TABLE IF NOT EXISTS `internet_plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `duration_hours` int NOT NULL,
  `data_limit_mb` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `internet_plans`
--

INSERT INTO `internet_plans` (`id`, `name`, `description`, `price`, `duration_hours`, `data_limit_mb`, `created_at`, `updated_at`) VALUES
(1, 'Basic Plan', 'Suitable for light browsing and messaging.', 5.00, 3, 100, '2024-07-17 05:50:17', '2024-07-17 05:50:17'),
(2, 'Standard Plan', 'Ideal for moderate internet usage including streaming.', 10.00, 5, 500, '2024-07-17 05:50:18', '2024-07-17 05:50:18'),
(3, 'Premium Plan', 'High-speed internet for heavy usage, including streaming and downloads.', 15.00, 10, 1024, '2024-07-17 05:50:18', '2024-07-17 05:50:18');

-- --------------------------------------------------------

--
-- Table structure for table `plan_activations`
--

DROP TABLE IF EXISTS `plan_activations`;
CREATE TABLE IF NOT EXISTS `plan_activations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_plan_activations_plans` (`plan_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `plan_activations`
--

INSERT INTO `plan_activations` (`id`, `plan_id`, `start_time`, `end_time`) VALUES
(1, 1, '2024-07-17 12:39:30', '2024-07-17 12:39:34');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
