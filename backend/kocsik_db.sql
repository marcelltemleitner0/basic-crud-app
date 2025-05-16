-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 16, 2025 at 05:39 AM
-- Server version: 8.0.42
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kocsik_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `kategoriak`
--

CREATE TABLE `kategoriak` (
  `id` int NOT NULL,
  `kategoria_id` int NOT NULL,
  `kategoria_nev` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `markak`
--

CREATE TABLE `markak` (
  `id` int NOT NULL,
  `nev` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `markak`
--

INSERT INTO `markak` (`id`, `nev`) VALUES
(30, 'Audi'),
(31, 'Audi'),
(32, 'Audi'),
(33, 'BMW'),
(34, 'BMW'),
(35, 'Suzuki');

-- --------------------------------------------------------

--
-- Table structure for table `modellek`
--

CREATE TABLE `modellek` (
  `id` int NOT NULL,
  `marka_id` int NOT NULL,
  `modell_nev` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `modellek`
--

INSERT INTO `modellek` (`id`, `marka_id`, `modell_nev`) VALUES
(28, 30, 'A6'),
(29, 31, 'A7'),
(30, 32, 'A8'),
(31, 33, 'E36'),
(32, 34, 'E35'),
(33, 35, 'Swift1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategoria_id` (`kategoria_id`);

--
-- Indexes for table `markak`
--
ALTER TABLE `markak`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modellek`
--
ALTER TABLE `modellek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `marka_id` (`marka_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategoriak`
--
ALTER TABLE `kategoriak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `markak`
--
ALTER TABLE `markak`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `modellek`
--
ALTER TABLE `modellek`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD CONSTRAINT `kategoriak_ibfk_1` FOREIGN KEY (`kategoria_id`) REFERENCES `modellek` (`id`);

--
-- Constraints for table `modellek`
--
ALTER TABLE `modellek`
  ADD CONSTRAINT `modellek_ibfk_1` FOREIGN KEY (`marka_id`) REFERENCES `markak` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
