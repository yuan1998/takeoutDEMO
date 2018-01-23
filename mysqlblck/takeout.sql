-- MySQL dump 10.13  Distrib 5.7.20, for osx10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: takeout
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `count` int(10) unsigned NOT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_Uid_Pid` (`user_id`,`product_id`),
  KEY `fk_product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,2,10,8,'2018-01-03 13:32:42','2018-01-08 00:26:36'),(6,2,21,1,'2018-01-08 17:35:30',NULL),(7,2,20,1,'2018-01-08 17:35:37',NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat`
--

DROP TABLE IF EXISTS `cat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat`
--

LOCK TABLES `cat` WRITE;
/*!40000 ALTER TABLE `cat` DISABLE KEYS */;
INSERT INTO `cat` VALUES (2,'辛辣','2017-12-17 07:32:16','2018-01-04 19:44:27'),(11,'清淡','2017-12-17 19:54:02','2018-01-04 19:44:21'),(22,'炙烤','2017-12-22 21:44:10','2018-01-04 19:43:52'),(23,'油炸','2017-12-29 12:55:24','2018-01-04 19:43:46'),(24,'红烧清蒸','2017-12-29 12:57:55','2018-01-04 19:43:38'),(25,'清蒸','2017-12-29 12:57:59','2018-01-04 19:43:22'),(26,'红烧','2017-12-29 13:27:13','2018-01-04 19:43:14');
/*!40000 ALTER TABLE `cat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` varchar(128) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `createTime` datetime NOT NULL,
  `product` json DEFAULT NULL,
  `status` varchar(55) NOT NULL DEFAULT 'ready',
  `snapshot` json NOT NULL,
  `payTime` datetime DEFAULT NULL,
  `price` double NOT NULL,
  `updateTime` datetime DEFAULT NULL,
  `count` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'TO-42293887998192459761',2,'2017-12-29 22:44:41','[{\"id\": 91, \"count\": 1, \"price\": 29, \"title\": \"dt111\", \"product_id\": 9}, {\"id\": 92, \"count\": 1, \"price\": 15, \"title\": \"TEST1!\", \"product_id\": 10}]','ready','[{\"id\": 9, \"price\": 29, \"sales\": 2, \"stock\": 12, \"title\": \"dt111\", \"cat_id\": 2, \"coverUrl\": \"151436167104.png\", \"createTime\": \"2017-12-27 16:01:11\", \"updateTime\": null}, {\"id\": 10, \"price\": 15, \"sales\": 21, \"stock\": 5, \"title\": \"TEST1!\", \"cat_id\": 2, \"coverUrl\": \"151437384802.png\", \"createTime\": \"2017-12-27 19:24:08\", \"updateTime\": null}]',NULL,44,NULL,0),(2,'TO-42293888776675687844',2,'2017-12-29 22:48:58','[{\"id\": 91, \"count\": 1, \"price\": 29, \"title\": \"dt111\", \"product_id\": 9}, {\"id\": 92, \"count\": 1, \"price\": 15, \"title\": \"TEST1!\", \"product_id\": 10}]','ready','[{\"id\": 9, \"price\": 29, \"sales\": 2, \"stock\": 12, \"title\": \"dt111\", \"cat_id\": 2, \"coverUrl\": \"151436167104.png\", \"createTime\": \"2017-12-27 16:01:11\", \"updateTime\": null}, {\"id\": 10, \"price\": 15, \"sales\": 21, \"stock\": 5, \"title\": \"TEST1!\", \"cat_id\": 2, \"coverUrl\": \"151437384802.png\", \"createTime\": \"2017-12-27 19:24:08\", \"updateTime\": null}]',NULL,44,NULL,0),(3,'TO-22293889015976006289',2,'2017-12-29 22:50:17','[{\"id\": 90, \"count\": 2, \"price\": 56465, \"title\": \"654654\", \"product_id\": 8}, {\"id\": 93, \"count\": 1, \"price\": 213, \"title\": \"35321\", \"product_id\": 11}]','ready','[{\"id\": 8, \"price\": 56465, \"sales\": 12312, \"stock\": 213321, \"title\": \"654654\", \"cat_id\": null, \"coverUrl\": \"151429867407.png\", \"createTime\": \"2017-12-26 22:31:14\", \"updateTime\": null}, {\"id\": 11, \"price\": 213, \"sales\": 2131, \"stock\": 1323, \"title\": \"35321\", \"cat_id\": 22, \"coverUrl\": \"\", \"createTime\": \"2017-12-27 19:26:39\", \"updateTime\": null}]',NULL,113143,NULL,0),(4,'TO-72293890218536023396',2,'2017-12-29 22:56:54','[{\"id\": 95, \"count\": 1, \"price\": 56465, \"title\": \"654654\", \"product_id\": 8}, {\"id\": 96, \"count\": 1, \"price\": 29, \"title\": \"dt111\", \"product_id\": 9}]','ready','[{\"id\": 8, \"price\": 56465, \"sales\": 12312, \"stock\": 213321, \"title\": \"654654\", \"cat_id\": null, \"coverUrl\": \"151429867407.png\", \"createTime\": \"2017-12-26 22:31:14\", \"updateTime\": null}, {\"id\": 9, \"price\": 29, \"sales\": 2, \"stock\": 12, \"title\": \"dt111\", \"cat_id\": 2, \"coverUrl\": \"151436167104.png\", \"createTime\": \"2017-12-27 16:01:11\", \"updateTime\": null}]',NULL,56494,NULL,0),(5,'TO-02294008867625607889',2,'2017-12-30 09:49:43','[{\"id\": 97, \"count\": 1, \"price\": 15, \"title\": \"TEST1!\", \"user_id\": 2, \"product_id\": 10}, {\"id\": 98, \"count\": 1, \"price\": 213, \"title\": \"35321\", \"user_id\": 2, \"product_id\": 11}]','ready','[{\"id\": 10, \"price\": 15, \"sales\": 21, \"stock\": 5, \"title\": \"TEST1!\", \"cat_id\": 2, \"coverUrl\": \"151437384802.png\", \"createTime\": \"2017-12-27 19:24:08\", \"updateTime\": null}, {\"id\": 11, \"price\": 213, \"sales\": 2131, \"stock\": 1323, \"title\": \"35321\", \"cat_id\": 22, \"coverUrl\": \"\", \"createTime\": \"2017-12-27 19:26:39\", \"updateTime\": null}]',NULL,228,NULL,0),(6,'TO-62294054160405196225',2,'2017-12-30 13:58:55','[{\"id\": 99, \"count\": 1, \"price\": 56465, \"title\": \"654654\", \"user_id\": 2, \"product_id\": 8}, {\"id\": 100, \"count\": 1, \"price\": 29, \"title\": \"dt111\", \"user_id\": 2, \"product_id\": 9}]','ready','[{\"id\": 8, \"price\": 56465, \"sales\": 12312, \"stock\": 213321, \"title\": \"654654\", \"cat_id\": null, \"coverUrl\": \"151429867407.png\", \"createTime\": \"2017-12-26 22:31:14\", \"updateTime\": null}, {\"id\": 9, \"price\": 29, \"sales\": 2, \"stock\": 12, \"title\": \"dt111\", \"cat_id\": 2, \"coverUrl\": \"151436167104.png\", \"createTime\": \"2017-12-27 16:01:11\", \"updateTime\": null}]',NULL,56494,NULL,0),(7,'TO-62294289328358439556',2,'2017-12-31 11:32:46','[{\"id\": 101, \"count\": 2, \"price\": 123132, \"title\": \"u54c8u54c8u54c8u4e00\", \"user_id\": 2, \"product_id\": 12}]','close','[{\"id\": 12, \"price\": 123132, \"sales\": 12, \"stock\": 123, \"title\": \"u54c8u54c8u54c8u4e00\", \"cat_id\": 23, \"coverUrl\": \"151469114806.png\", \"createTime\": \"2017-12-31 11:32:28\", \"updateTime\": null}]',NULL,246264,'2017-12-31 17:24:06',0),(8,'TO-42294329652643843529',2,'2017-12-31 15:14:37','[{\"id\": 103, \"count\": 3, \"price\": 123132, \"title\": \"u54c8u54c8u54c8u4e00\", \"user_id\": 2, \"product_id\": 12}]','success','[{\"id\": 12, \"price\": 123132, \"sales\": 12, \"stock\": 123, \"title\": \"u54c8u54c8u54c8u4e00\", \"cat_id\": 23, \"coverUrl\": \"151469114806.png\", \"createTime\": \"2017-12-31 11:32:28\", \"updateTime\": null}]',NULL,369396,'2018-01-05 15:13:00',0),(9,'TO-92294329885908338916',2,'2017-12-31 15:15:54','[{\"id\": 106, \"count\": 1, \"price\": 123132, \"title\": \"u54c8u54c8u54c8u4e00\", \"user_id\": 2, \"product_id\": 12}]','delivery','[{\"id\": 12, \"price\": 123132, \"sales\": 12, \"stock\": 123, \"title\": \"u54c8u54c8u54c8u4e00\", \"cat_id\": 23, \"coverUrl\": \"151469114806.png\", \"createTime\": \"2017-12-31 11:32:28\", \"updateTime\": null}]',NULL,123132,'2018-01-05 15:12:57',0),(10,'TO-42294335450936244881',2,'2017-12-31 15:46:31','[{\"id\": 107, \"count\": 1, \"price\": 123132, \"title\": \"哈哈哈一\", \"user_id\": 2, \"product_id\": 12}]','ready','[{\"id\": 12, \"price\": 123132, \"sales\": 12, \"stock\": 123, \"title\": \"哈哈哈一\", \"cat_id\": 23, \"coverUrl\": \"151469114806.png\", \"createTime\": \"2017-12-31 11:32:28\", \"updateTime\": null}]',NULL,123132,'2018-01-05 15:26:01',0);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(65) NOT NULL,
  `price` double NOT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `coverUrl` varchar(1056) DEFAULT NULL,
  `sales` int(10) unsigned DEFAULT '0',
  `stock` int(10) unsigned DEFAULT '0',
  `cat_id` int(10) unsigned DEFAULT NULL,
  `info` longtext,
  PRIMARY KEY (`id`),
  KEY `fk_cat_id` (`cat_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `cat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (10,'钥匙',15,'2017-12-27 19:24:08','2018-01-05 14:13:12','151513279208.png',21,5,2,NULL),(19,'程序员炒鱿鱼',1,'2018-01-07 23:23:52',NULL,'151533863207.jpg',1000,100,26,NULL),(20,'程序员泡面',2,'2018-01-08 00:36:54',NULL,'151534301407.jpg',100,2,25,NULL),(21,'程序员华夫饼',3,'2018-01-08 00:37:19',NULL,'151534303902.jpg',30,3,23,NULL),(22,'程序员意面',5,'2018-01-08 00:37:46',NULL,'151534306607.jpg',5,5,11,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(65) NOT NULL,
  `password` varchar(128) NOT NULL,
  `location` json DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `permission` int(11) NOT NULL DEFAULT '1',
  `sex` int(11) DEFAULT '0',
  `birth` datetime DEFAULT NULL,
  `email` varchar(555) DEFAULT NULL,
  `info` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'sssss','b5a055098a146497acc1aaae48a6e416',NULL,'2017-12-19 15:39:04',NULL,1,0,NULL,NULL,NULL),(2,'user1','b5a055098a146497acc1aaae48a6e416',NULL,'2017-12-19 15:39:46',NULL,999,0,NULL,NULL,NULL),(3,'user11','b5a055098a146497acc1aaae48a6e416',NULL,'2018-01-05 19:03:24',NULL,1,0,NULL,'123123@22.2',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userLocation`
--

DROP TABLE IF EXISTS `userLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userLocation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `location` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userLocation`
--

LOCK TABLES `userLocation` WRITE;
/*!40000 ALTER TABLE `userLocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `userLocation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-23 17:00:53
