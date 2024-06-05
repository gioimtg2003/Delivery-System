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
  `IdentityCard` char(12) COLLATE utf8mb4_general_ci NOT NULL,
  `LicensePlates` char(12) COLLATE utf8mb4_general_ci NOT NULL,
  `DriveLicenseNumber` char(12) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgDriveLicenseBefore` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgIdentityCardBefore` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgIdentityCardAfter` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgVehicleRegistrationCertBefore` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `ImgVehicleRegistrationCertAfter` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `CreatedVerify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ImgDriveLicenseAfter` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
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
  `Province` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `District` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Ward` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippers`
--

LOCK TABLES `shippers` WRITE;
/*!40000 ALTER TABLE `shippers` DISABLE KEYS */;
INSERT INTO `shippers` VALUES (1,'Gioi','String(Province)','String(District)','String(Ward)','String(DetailsAddress)','0334939304','String(Email)','$2a$10$rnGsVUyOKSJVxVBcP9QDOuCEw1P2fIMQi9EkhbZbpPX3LaqljXL2G',0,'2024-06-01 08:48:16','2024-06-01 08:48:16','String(Hamlet)'),(5,'Gioi','String(Province)','String(District)','String(Ward)','String(DetailsAddress)1','0334939303','String(Email)','$2a$10$3vkvsmp9WotesbaLHyevLuUygjwcxVhf94bg/fOuJyYCS1L/TqAm6',0,'2024-06-01 09:21:12','2024-06-01 09:21:12','String(Hamlet)'),(6,'Nguyen Cong','undefined','undefined','undefined','23','0305939403','conggr.rp@gmail.com','$2a$10$uodKm/tAHWk.CPvdUD982ONeFzkPkNOigJp9y9G4Uoo3SIzoLvxZ6',0,'2024-06-01 10:02:48','2024-06-01 10:02:48','undefined'),(7,'Nguyen Cong Gioi','undefined','undefined','undefined','','0304939384','conggioi.pro264@gmail.com','$2a$10$w4zhum0GeHKg6GOdp6fjRe1zpHqYAgN0Drx0oSBff.0tywBbU/7Ue',0,'2024-06-02 11:22:07','2024-06-02 11:22:07','undefined'),(8,'Hhihii','undefined','undefined','undefined','','0304030303','si@gmail.com','$2a$10$DlK5XR/OJWOcKZJPNxDRyOJgxKlK6oZq9p2TTq0nC9JIM2t5.NyUK',0,'2024-06-02 11:24:14','2024-06-02 11:24:14','undefined'),(11,'Gioi','String(Province)','String(District)','String(Ward)','String(DetailsAddress)1','0334939313','String(3333322)','$2a$10$uq5bvoSy1k1JGFzWfd42ReouEBrpfFcgFaVZW9G2TBH41P5rF0a9u',0,'2024-06-02 15:24:53','2024-06-02 15:24:53','String(Hamlet)'),(12,'Nguyen Van Canh','undefined','undefined','undefined','','0304030394','conggioi@gmail.sx','$2a$10$BEt4c6myChe6/Kv12.MhTOCCkmQv9k3Xpxe2SCjEhV6k6E4TzEUnK',0,'2024-06-02 15:29:23','2024-06-02 15:29:23','undefined'),(13,'Nguyen Van Canh','undefined','undefined','undefined','','0304030395','conggioi@gmail.sr','$2a$10$S1d0vHZWh5WDO812OktzAeiPQroGAIo7ZASeZTaKjpDyssHHUEitW',0,'2024-06-02 15:32:47','2024-06-02 15:32:47','undefined'),(14,'Nguyen Van Canh','undefined','undefined','undefined','','0304030391','conggioi@gmail.sxd','$2a$10$GeWZx/m4599kM57bu2UBVO/ds/RLtQE.MfLi4Btg5XuBi5FB2jRuy',0,'2024-06-02 15:44:03','2024-06-02 15:44:03','undefined'),(15,'Nguyen Van Canh','undefined','undefined','undefined','','0302030394','213@gmai.co','$2a$10$tsryRSgx6ThPDj4AggPqB.0OWi0sgHc2b/V8lq0VcJ6Da3HZpoi6.',0,'2024-06-02 16:09:18','2024-06-02 16:09:18','undefined'),(16,'Nguyen Van Tien','undefined','undefined','undefined','','0304939493','cs@gm.com','$2a$10$MeoZAqSpRaFQfW.wNVTDI.OFcmGDcqj1xZ9pKe2o96VUWlVUAx3DK',0,'2024-06-03 08:47:24','2024-06-03 08:47:24','undefined'),(17,'ngusu','undefined','undefined','undefined','','0304030304','cosn@gms.co','$2a$10$JxFNtHUONwu2NJpLX2itJenBxllYEyvToVvsf2df4kfVQicoCdiTK',0,'2024-06-03 08:50:08','2024-06-03 08:50:08','undefined'),(18,'Nguyen','undefined','undefined','undefined','','0304939394','cososos@mgial.cos','$2a$10$9a4hzAHAMJbPQLvED7t/se7aiA3ixdyEroR/h5GkItxq63Uyh8oHO',0,'2024-06-03 08:51:49','2024-06-03 08:51:49','undefined'),(19,'Nguyen','Bình Định','Huyện Vĩnh Thạnh','Thị Trấn Vĩnh Thạnh','','0348384838','sisisid@gmail.cso','$2a$10$UbepCf2qXoPEn0gACqRIOe.KdD1.blya5szEgBc8fGT1LMuIe9yfC',0,'2024-06-03 08:54:38','2024-06-03 08:54:38','Khu Phố Định Bình'),(20,'Nguyen Cong','Bình Định','Huyện Hoài Ân','Xã Ân Tín','','0303949394','30400@gmai.co','$2a$10$F25SwSXLTczZ5oWb4kRWPOzxjwGb8US5cJ.0pjwUs4HA5NQK1WRPq',0,'2024-06-03 14:46:46','2024-06-03 14:46:46','Thôn Năng An');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transporttype`
--

LOCK TABLES `transporttype` WRITE;
/*!40000 ALTER TABLE `transporttype` DISABLE KEYS */;
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

-- Dump completed on 2024-06-04 10:13:55
