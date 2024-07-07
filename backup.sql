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
  `Name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Phone` char(11) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` char(64) COLLATE utf8mb4_general_ci NOT NULL,
  `Province` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `District` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Ward` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `AddressDetails` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `OTP` char(4) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Verify` tinyint(1) DEFAULT '0',
  `ExpOtp` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Phone` (`Phone`),
  UNIQUE KEY `Phone_2` (`Phone`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (31,NULL,'0','84367093723','$2a$10$WNDzDmLYnFg4/8DqYpDyUuivU4gmGxp/eK1VbWWMigiff1afNi.j2',NULL,NULL,NULL,NULL,'2024-07-05 09:27:30','9869',1,'2024-07-05 02:42:30'),(35,NULL,'conggioi@gmail.com','84367093722','$2a$10$Qz2a4eMvE5GzOnkOpvdku.Ms1psbPAq9Mbx9Gh6Hek0HhrWBsT.iu',NULL,NULL,NULL,NULL,'2024-07-05 09:34:50','8104',0,'2024-07-05 02:49:50'),(37,NULL,'conggioi.pro264@gmail.com','84367093721','$2a$10$CwTHDn2uyN32Vohw9u8ncOTBzPtoVHtReG3COA09XnyKhF2vDlu9S',NULL,NULL,NULL,NULL,'2024-07-05 09:35:42','6146',1,'2024-07-05 02:50:42');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driverwallet`
--

DROP TABLE IF EXISTS `driverwallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driverwallet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idShipper` smallint NOT NULL,
  `idEmployee` smallint DEFAULT NULL,
  `Amount` int NOT NULL,
  `ImgUrl` varchar(50) NOT NULL,
  `Action` enum('deposit','withdraw') NOT NULL,
  `Status` enum('pending','reject','accept') NOT NULL DEFAULT 'pending',
  `TimeSubmit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `TimeUpdate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idShipper` (`idShipper`),
  KEY `driverwallet_ibfk_2` (`idEmployee`),
  CONSTRAINT `driverwallet_ibfk_1` FOREIGN KEY (`idShipper`) REFERENCES `shippers` (`id`),
  CONSTRAINT `driverwallet_ibfk_2` FOREIGN KEY (`idEmployee`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driverwallet`
--

LOCK TABLES `driverwallet` WRITE;
/*!40000 ALTER TABLE `driverwallet` DISABLE KEYS */;
INSERT INTO `driverwallet` VALUES (1,77,3,500000,'driverwallet_77-1720175126840.jpg','deposit','accept','2024-07-05 10:25:27','2024-07-05 10:26:02');
/*!40000 ALTER TABLE `driverwallet` ENABLE KEYS */;
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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `idShipper` smallint DEFAULT NULL,
  `idCustomer` smallint NOT NULL,
  `SenderName` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `SenderPhone` char(11) COLLATE utf8mb4_general_ci NOT NULL,
  `SenderAddress` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `SenderDetailsAddress` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `SenderCoordinates` char(30) COLLATE utf8mb4_general_ci NOT NULL,
  `ReceiverName` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `ReceiverPhone` char(11) COLLATE utf8mb4_general_ci NOT NULL,
  `ReceiverAddress` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `ReceiverDetailsAddress` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `ReceiverCoordinates` char(30) COLLATE utf8mb4_general_ci NOT NULL,
  `idTransportType` int NOT NULL,
  `isCOD` tinyint(1) NOT NULL DEFAULT '0',
  `COD` int NOT NULL DEFAULT '0',
  `isTakeShippingFee` tinyint(1) NOT NULL DEFAULT '0',
  `ShippingFee` int NOT NULL,
  `CurrentStatus` enum('pending','pending_pickup','picked_up','release','cancel','success') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `TimeCurrentStatus` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Distance` int NOT NULL DEFAULT '0',
  `Note` text COLLATE utf8mb4_general_ci NOT NULL,
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
INSERT INTO `orders` VALUES ('248e3f53-fd0c-4030-9d0d-34d97f8b4a22',77,37,'Giới','84367093723','Đường Dương Đình Hội, Phường Phước Long B, Thủ Đức, Hồ Chí Minh, Việt Nam','200/6','10.82117,106.77914','Hi','84393117835','639 Đường Phạm Văn Chí, Phường 8, Quận 6, Hồ Chí Minh, Việt Nam','','10.7391,106.63671',6,0,0,1,145705,'pending_pickup','2024-07-05 10:02:31',23507,'','2024-07-05 10:02:31'),('562a6f86-d06b-412a-86b0-7ff8e5c545bb',NULL,37,'Gioi','84367093723','18 Đường Cộng Hòa, Phường 13, Quận Tân Bình, Hồ Chí Minh, Việt Nam','','10.80313,106.64405','Hưng','84367093723','Hẻm 200-200/14 Đường Dương Đình Hội, Phường Phước Long B, Thủ Đức, Hồ Chí Minh, Việt Nam','','10.82485,106.78121',5,0,0,0,102400,'pending','2024-07-05 11:33:02',19687,'Cod 200k','2024-07-05 11:33:02');
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
  `Status` enum('pending','pending_pickup','picked_up','release','cancel','success') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `Status` (`Status`),
  KEY `idOrder` (`idOrder`),
  CONSTRAINT `orderstatus_ibfk_2` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderstatus`
--

LOCK TABLES `orderstatus` WRITE;
/*!40000 ALTER TABLE `orderstatus` DISABLE KEYS */;
INSERT INTO `orderstatus` VALUES ('248e3f53-fd0c-4030-9d0d-34d97f8b4a22','pending','2024-07-05 10:02:31'),('248e3f53-fd0c-4030-9d0d-34d97f8b4a22','pending_pickup','2024-07-05 10:26:58'),('562a6f86-d06b-412a-86b0-7ff8e5c545bb','pending','2024-07-05 11:33:02');
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
  `IdentityCard` char(12) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `LicensePlates` char(12) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `DriveLicenseNumber` char(12) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ImgDriveLicenseBefore` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgDriveLicenseAfter` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `ImgIdentityCardBefore` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgIdentityCardAfter` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgVehicleRegistrationCertBefore` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgVehicleRegistrationCertAfter` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Status` enum('pending','verified','cancel') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `CreatedVerify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idShipper`),
  UNIQUE KEY `idShipper_UNIQUE` (`idShipper`),
  KEY `shipperidentity_ibfk_2` (`idShipper`),
  CONSTRAINT `shipperidentity_ibfk_2` FOREIGN KEY (`idShipper`) REFERENCES `shippers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipperidentity`
--

LOCK TABLES `shipperidentity` WRITE;
/*!40000 ALTER TABLE `shipperidentity` DISABLE KEYS */;
INSERT INTO `shipperidentity` VALUES (77,NULL,NULL,NULL,'imgdrivelicense_77-1720174395677.jpg','imgdrivelicense_77-1720174413282.jpg','imgidentity_77-1720174255366.jpg','imgidentity_77-1720174281158.jpg','imgvehicleregistrationcert_77-1720174456009.jpg','imgvehicleregistrationcert_77-1720174471679.jpg','verified','2024-07-05 10:14:33');
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
  `Balance` int NOT NULL DEFAULT '0',
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
  `OnlineStatus` tinyint(1) NOT NULL DEFAULT '0',
  `Status` enum('Free','Delivering') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Free',
  `Wallet` int NOT NULL DEFAULT '0',
  `lng` decimal(15,10) DEFAULT NULL,
  `lat` decimal(15,10) DEFAULT NULL,
  `idTransport` int DEFAULT NULL,
  `idOrder` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Phone` (`Phone`),
  UNIQUE KEY `idOrder_UNIQUE` (`idOrder`),
  KEY `idTransport` (`idTransport`),
  CONSTRAINT `shippers_ibfk_1` FOREIGN KEY (`idTransport`) REFERENCES `transporttype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippers`
--

LOCK TABLES `shippers` WRITE;
/*!40000 ALTER TABLE `shippers` DISABLE KEYS */;
INSERT INTO `shippers` VALUES (77,'Nguyen Cong Gioi',482515,NULL,NULL,NULL,NULL,'0367093723','','$2a$10$Tb4V7bFmcjYJw/AYZ2l5neEAIZe5CbHvlrq3Z1NPjrJxYWgDePq5W',1,'2024-07-05 10:10:40','2024-07-05 10:10:40',NULL,1,'Delivering',0,-122.0840000000,37.4219983000,6,'248e3f53-fd0c-4030-9d0d-34d97f8b4a22');
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
  `Name` enum('pending','delivery','release','cancel','success') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `Created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  `Rate` int NOT NULL,
  `CostLimit` int NOT NULL,
  `KeyName` char(7) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transporttype`
--

LOCK TABLES `transporttype` WRITE;
/*!40000 ALTER TABLE `transporttype` DISABLE KEYS */;
INSERT INTO `transporttype` VALUES (5,'Xe Máy',NULL,'transport-bike.png',4320,16000,'scooter'),(6,'Xe Van 500 Kg',NULL,'transport-van.png',10800,111780,'car'),(7,'Xe Tải 1 Tấn',NULL,'transport-truck-1t.png',12420,148500,'truck'),(8,'Xe Tải 2 Tấn',NULL,'transport-truck-2t.png',13500,260280,'truck');
/*!40000 ALTER TABLE `transporttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportvisiblerules`
--

DROP TABLE IF EXISTS `transportvisiblerules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportvisiblerules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TransportTypeId` int DEFAULT NULL,
  `CanSeeTransportTypeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TransportTypeId` (`TransportTypeId`),
  KEY `CanSeeTransportTypeId` (`CanSeeTransportTypeId`),
  CONSTRAINT `transportvisiblerules_ibfk_1` FOREIGN KEY (`TransportTypeId`) REFERENCES `transporttype` (`id`),
  CONSTRAINT `transportvisiblerules_ibfk_2` FOREIGN KEY (`CanSeeTransportTypeId`) REFERENCES `transporttype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportvisiblerules`
--

LOCK TABLES `transportvisiblerules` WRITE;
/*!40000 ALTER TABLE `transportvisiblerules` DISABLE KEYS */;
INSERT INTO `transportvisiblerules` VALUES (2,6,5),(3,7,5),(4,7,6),(5,8,5),(6,8,6),(7,8,7);
/*!40000 ALTER TABLE `transportvisiblerules` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-05 16:50:46
