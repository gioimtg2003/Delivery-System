-- MySQL dump 10.13  Distrib 8.4.0, for Linux (x86_64)
--
-- Host: localhost    Database: DeliverySystem
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Phone` char(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` char(64) COLLATE utf8mb4_general_ci NOT NULL,
  `Province` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `District` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Ward` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `AddressDetails` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Phone` (`Phone`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Password` char(64) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `Phone` char(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Role` char(15) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Phone` (`Phone`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (3,'Nguyen Van A','$2a$10$OcvEE6SklPPrZWjZXFbyT.NippCHr8JVYxpnaeRnQOooiDpjSGIj2','admin','0394939394','Admin'),(4,'admin','admin','admin@','123456789','admin');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historywallet`
--

DROP TABLE IF EXISTS `historywallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historywallet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idShipper` smallint NOT NULL,
  `idEmployee` smallint NOT NULL,
  `Money` int NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idShipper` (`idShipper`),
  KEY `idEmployee` (`idEmployee`),
  CONSTRAINT `historywallet_ibfk_1` FOREIGN KEY (`idShipper`) REFERENCES `shippers` (`id`),
  CONSTRAINT `historywallet_ibfk_2` FOREIGN KEY (`idEmployee`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historywallet`
--

LOCK TABLES `historywallet` WRITE;
/*!40000 ALTER TABLE `historywallet` DISABLE KEYS */;
/*!40000 ALTER TABLE `historywallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idShipper` smallint NOT NULL,
  `idCustomer` smallint NOT NULL,
  `SenderName` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `SenderAddress` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `SenderPhone` char(10) COLLATE utf8mb4_general_ci NOT NULL,
  `ReceiverName` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `ReceiverAddress` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `ReceiverPhone` char(10) COLLATE utf8mb4_general_ci NOT NULL,
  `idTransportType` int NOT NULL,
  `isCOD` tinyint(1) NOT NULL,
  `isTakeShippingFee` tinyint(1) NOT NULL,
  `ShippingFee` int NOT NULL,
  `TotalAmount` int NOT NULL,
  `CurrentStatus` bit(1) NOT NULL,
  `Description` text COLLATE utf8mb4_general_ci NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idShipper` (`idShipper`),
  KEY `idTransportType` (`idTransportType`),
  KEY `idCustomer` (`idCustomer`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`idShipper`) REFERENCES `shippers` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`idTransportType`) REFERENCES `transporttype` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`idCustomer`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderstatus`
--

DROP TABLE IF EXISTS `orderstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderstatus` (
  `idOrder` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `Status` int NOT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Status` (`Status`),
  KEY `idOrder` (`idOrder`),
  CONSTRAINT `orderstatus_ibfk_1` FOREIGN KEY (`Status`) REFERENCES `status` (`id`),
  CONSTRAINT `orderstatus_ibfk_2` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderstatus`
--

LOCK TABLES `orderstatus` WRITE;
/*!40000 ALTER TABLE `orderstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipperidentity`
--

DROP TABLE IF EXISTS `shipperidentity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipperidentity` (
  `idShipper` smallint NOT NULL,
  `idTransportType` int NOT NULL,
  `IdentityCard` char(12) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `LicensePlates` char(12) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DriveLicenseNumber` char(12) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ImgDriveLicenseBefore` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgDriveLicenseAfter` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `ImgIdentityCardBefore` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgIdentityCardAfter` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgVehicleRegistrationCertBefore` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgVehicleRegistrationCertAfter` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Status` enum('pending','verified','cancel') COLLATE utf8mb4_general_ci DEFAULT 'pending',
  `CreatedVerify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idShipper`),
  KEY `shipperidentity_ibfk_1` (`idTransportType`),
  KEY `shipperidentity_ibfk_2` (`idShipper`),
  CONSTRAINT `shipperidentity_ibfk_1` FOREIGN KEY (`idTransportType`) REFERENCES `transporttype` (`id`),
  CONSTRAINT `shipperidentity_ibfk_2` FOREIGN KEY (`idShipper`) REFERENCES `shippers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipperidentity`
--

LOCK TABLES `shipperidentity` WRITE;
/*!40000 ALTER TABLE `shipperidentity` DISABLE KEYS */;
INSERT INTO `shipperidentity` VALUES (30,5,NULL,NULL,NULL,'imgdrivelicense_30-1717745950307.jpg','imgdrivelicense_30-1717745954295.png','imgidentity_30-1717745943391.jpg','imgidentity_30-1717745947288.png','imgvehicleregistrationcert_30-1717745956787.png','imgvehicleregistrationcert_30-1717745960186.png','cancel','2024-06-07 07:39:24');
/*!40000 ALTER TABLE `shipperidentity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippers`
--

DROP TABLE IF EXISTS `shippers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippers` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Province` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `District` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Ward` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `DetailsAddress` varchar(70) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Phone` char(10) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Password` char(64) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Verify` tinyint(1) NOT NULL DEFAULT '0',
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `VerifyDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Hamlet` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Phone` (`Phone`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippers`
--

LOCK TABLES `shippers` WRITE;
/*!40000 ALTER TABLE `shippers` DISABLE KEYS */;
INSERT INTO `shippers` VALUES (27,'Nguyen Van Canh','Bắc Ninh','Thành Phố Bắc Ninh','Phường Phong Khê','','0301030394','213@gmai.cod','$2a$10$XqwfkzVi5HBuga2cWUpJ8OwEqmYhcPMykCdy35SNdiAbVqz3BOXpO',1,'2024-06-05 11:59:06','2024-06-05 11:59:06','Khu Dương Ổ'),(29,'Nguyen Thanh Tungs','Bến Tre','Huyện Mỏ Cày Nam','Xã Thành Thới B','','0404030391','213@gmai.coa','$2a$10$qu0cso5ZcQuooATJH9RMKOGxSAXFJTkFMHmOixcq1E1GaS2O3LFzu',1,'2024-06-05 12:07:02','2024-06-05 12:07:02','Ấp Bình Thạnh'),(30,'Nguyen thanh tuan','Bà Rịa - Vũng Tàu','Huyện Long Điền','Xã An Nhứt','','0392883823','congg.pro@gmail.co','$2a$10$dEgA3emE/i1NHDByvInHMO5TdxsmN0PhSGry3T6BE5GASS12jR/4G',0,'2024-06-07 07:38:56','2024-06-07 07:38:56','Bệnh Viện Phổi Phạm Hữu Chí'),(31,'Nguyen Thanh Tuat','Bình Định','Huyện Tuy Phước','Xã Phước Hưng','','0493949384','31ds@gmi.cso','$2a$10$Z1ejemrM.7u9mOWQh3Myw.e57nSMARVpI8J9YxklhvuBQwS2zr8ya',0,'2024-06-07 08:41:58','2024-06-07 08:41:58','Thôn Lương Lộc'),(32,'Gioi','String(Province)','String(District)','String(Ward)','String(DetailsAddress)1','0334939313','String(3333322)','$2a$10$vsJ0p5TRL.VvIrVLuVDRVenHamF0GdphShwLnQweA.aFCWyJxVJIW',0,'2024-06-08 09:04:47','2024-06-08 09:04:47','String(Hamlet)'),(46,'Nguyen Cong Gioi',NULL,NULL,NULL,NULL,'0367093722','conggioi.pro274@gmail.com','$2a$10$1NIwYROvFW0WtFvJJPdkyOUseyVbMtkqE41IYmkKGLiOPWM49Y2zG',0,'2024-06-10 14:38:03','2024-06-10 14:38:03',NULL),(48,'Nguyen Cong Gioi',NULL,NULL,NULL,NULL,'0367093723','conggioi.pro264@gmail.com','$2a$10$dKKvvXpvaOcvBKbiJeTZSeSNXeDbKVirXXlo65bo3rqOBQJwuFDDK',0,'2024-06-11 02:59:27','2024-06-11 02:59:27',NULL),(49,'Nguyen Van Canh','Quảng Ninh','Thành Phố Móng Cái','Phường Hải Hòa','','0349593943','conggioi@gmail.com','$2a$10$Fdne0c13EBx3PmzXvs3H3uKJKls1ZERz.u.9xwnxMbtmV2DPIuTpW',0,'2024-06-11 03:52:59','2024-06-11 03:52:59','Khu 2'),(50,'Nguyen cong gioi',NULL,NULL,NULL,NULL,'0365242365','c@gmail.co','$2a$10$glpEGfOAYoGMJ8l5TYRXL.9NGx9F90itdOLxi5Ac4q7WbVdm2HWOu',0,'2024-06-11 04:14:20','2024-06-11 04:14:20',NULL);
/*!40000 ALTER TABLE `shippers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transporttype`
--

DROP TABLE IF EXISTS `transporttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transporttype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Description` text COLLATE utf8mb4_general_ci,
  `ImgUrl` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transporttype`
--

LOCK TABLES `transporttype` WRITE;
/*!40000 ALTER TABLE `transporttype` DISABLE KEYS */;
INSERT INTO `transporttype` VALUES (5,'Xe Máy',NULL,'transport-bike.png'),(6,'Xe Van 500 Kg',NULL,'transport-van.png'),(7,'Xe Tải 1 Tấn',NULL,'transport-truck-1t.png'),(8,'Xe Tải 2 Tấn',NULL,'transport-truck-2t.png');
/*!40000 ALTER TABLE `transporttype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-11 16:16:29
