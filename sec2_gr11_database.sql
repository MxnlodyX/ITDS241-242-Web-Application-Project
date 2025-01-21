CREATE DATABASE  IF NOT EXISTS `puma` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `puma`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: puma
-- ------------------------------------------------------
-- Server version	9.0.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adminaccount`
--

DROP TABLE IF EXISTS `adminaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminaccount` (
  `Admin_ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `username` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(16) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `f_name` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `l_name` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Gender` varchar(1) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `tel_number` varchar(10) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `position` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `Address` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `profile_image` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Admin_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=503 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminaccount`
--

LOCK TABLES `adminaccount` WRITE;
/*!40000 ALTER TABLE `adminaccount` DISABLE KEYS */;
INSERT INTO `adminaccount` VALUES (1,'Hungry_admin191@mu.com','MxnlodyX','12345','Wattanachai','Boonchai','M','0834745429','Full-Stack Developer','Mahidol University','1732818594890.jpg','2024-11-28 18:28:51'),(2,'Navadol@mu.com','Navadol','1234','Navadol','Somboonkul','M','0987654321','Front-End Developer','MU Dormitory','1732882032671.jpg','2024-11-28 18:32:48');
/*!40000 ALTER TABLE `adminaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_ID` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) COLLATE utf8mb3_unicode_ci NOT NULL,
  `product_type` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `product_price` int NOT NULL,
  `product_collection` varchar(45) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `gender` varchar(1) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `product_description` text COLLATE utf8mb3_unicode_ci,
  `image` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`product_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (8,'Scuderia Ferrari','Shirt',3900,'Winter','M','ยกระดับสไตล์ฤดูหนาวของคุณด้วยเสื้อยืดแขนยาว Scuderia Ferrari Race Statement สุดเรียบหรู แสดงความรักต่อรูปม้าด้วยกราฟิกแสนโดดเด่นที่จะขับเคลื่อนคุณไปสู่อันดับที่หนึ่ง','1732882548062.jpg'),(9,'PUMA Essentials','Shirt',900,'Summer','M','เสื้อยืดแต่งโลโก้ Essentials ทั้งเท่และคลาสสิกมาพร้อมโลโก้ที่โดดเด่นและทรงที่สวมใส่สบายเหมาะกับทุกๆ วัน ถือเป็นเสื้อผ้าสปอร์ตชิ้นสำคัญ','1732882593155.avif'),(10,'CLUB DE COURSE','Shirt',780,'Rainny','U','ออกไปเที่ยวบนท้องถนนอย่างมีสไตล์ด้วยเสื้อยืด CLUB DE COURSE เสื้อยืดกราฟิกตัวนี้ผสมผสานกลิ่นอายของสไตล์นักกีฬาแบบย้อนยุคเข้ากับความเท่แบบร่วมสมัย','1732882631189.jpg'),(11,'Scuderia Ferrari MT7','Shirt',672,'Winter','M','เมื่อสัตว์ร้ายตัวใหญ่สองตัวมาพบกัน ประกายไฟจะปลิวว่อนแน่นอน ทั้งในสนามแข่งและที่อื่นๆ PUMA และ Scuderia Ferrari ร่วมกันสร้างสรรค์เสื้อที่มีสไตล์','1732882719395.jpg'),(12,'PUMA Essentials Women','Shirt',420,'Winter','F','เสริมลุคสบาย ๆ ของคุณด้วยเสื้อยืดเรียบ ๆ ตัวนี้ จาก Essentials Collection ของเรา คุณเลือกใส่ได้ทั้งแบบทางการและแบบสบาย ๆ','1732882849965.avif'),(13,'PUMA SQUAD','Shirt',1000,'Winter','F','สร้างความโดดเด่นด้วยเสื้อยืดสไตล์สปอร์ตสุดชิคตัวนี้ โลโก้แบรนด์ PUMA สไตล์กีฬามหาวิทยาลัยให้ลุคแบบนักกีฬา ส่วนผ้าฝ้ายก็ให้ความสบายตลอดวัน','1732882991126.avif'),(14,'PUMA FIT','Shirt',528,'Winter','F','เสื้อยืดออกกำลังกายที่ระบายอากาศได้ดีสุด ๆ จาก PUMA FIT ตัวนี้คือที่สุดแห่งเสื้อผ้าระบายอากาศ การออกแบบของเสื้อที่มีน้ำหนักเบาและยืดหยุ่นได้สูงนั้นเหมาะอย่างยิ่ง','1732883035945.avif'),(15,'PWRFrame TR 2','Sneaker',1584,'Rainny','F','สร้างรากฐานสำหรับการออกกำลังกายที่ยอดเยี่ยมด้วย PWRFRAME TR 2 ส่วนบนพัฒนามาใหม่ให้ดีกว่าเวอร์ชัน 1 และเทคโนโลยี PWRFRAME ที่ปลายเท้า','1732883132098.avif'),(16,'PWRFrame TR 3','Sneaker',1584,'Summer','M','วางรากฐานสําหรับการออกกําลังกายของคุณ PWRFrame TR 3 มาพร้อมกับดีไซน์ใหม่ทั้งหมด โดดเด่นด้วยเทคโนโลยี PWRFRAME','1732883203686.avif'),(17,'Softride Enzo NXT','Sneaker',1218,'Summer','M','นี่คือสิ่งที่จะเกิดขึ้นเมื่อคุณรวมสินค้ายอดนิยมที่สร้างสรรค์ที่สุดของ PUMA เข้าไว้ด้วยกัน: Softride และ Enzo รองเท้าที่ลดแรงกระแทกได้เต็มที่','1732883334284.avif'),(18,'PUMA Infusion','Sneaker',1344,'Summer','M','รองเท้า Infusion ของเราได้รับแรงบันดาลใจจากดีไซน์ของรองเท้าเทรนนิ่ง Fuse โดยแปลงโฉมให้เป็นรองเท้าวิ่งที่คู่สวย','1732883423640.avif'),(19,'Softride Enzo NXT','Sneaker',1176,'Rainny','M','ขอแนะนำรองเท้าวิ่งที่รวมเอารองเท้าสองรุ่นยอดนิยมของ PUMA เข้าไว้ด้วยกัน ซึ่งก็คือ: Softride และ Enzo ใช้เทคโนโลยี Softride EVA ','1732883505293.avif'),(20,'Rebound V6 Lo Youth','Sneaker',1080,'Winter','M','กลับสู่ความเบสิกด้วยรองเท้าผ้าใบที่ได้แรงบันดาลใจจากยุคเรโทร โดดเด่นด้วยรายละเอียดแบบคลาสสิก','1732884191608.avif'),(21,'Club de Course','Hat',1400,'Winter','M','สร้างความโดดเด่นด้วยหมวกแก๊ป Club de Course ไม่ว่าจะเดินเล่นบนถนนในเมืองหรือปั่นจักรยานในชนบท ไอเทมสุดคลาสสิกชิ้นนี้จะช่วยปกป้องคุณอย่างมีสไตล์','1732884763218.avif'),(22,'Classics Elevated','Hat',1400,'Summer','U','หมวกเบสบอลสุดคลาสสิกรุ่นใหม่จะโดดเด่นเสมอ ไม่ว่าจะสวมใส่ที่นามหรือที่ลู่ ปรับให้พอดีและเตรียมพร้อมสําหรับไลฟ์สไตล์ที่กระฉับกระเฉงและทันสมัยเลย สไตล์สําหรับชัยชนะในทุกวันของคุณ','1732884823028.avif'),(23,'PUMA x lemlem','Hat',588,'Rainny','F','PUMA x lemlem เป็นความร่วมมือระหว่างแบรนด์กีฬาจากเยอรมันและแบรนด์แฟชั่นที่มีเอกลักษณ์ที่ก่อตั้งขึ้นโดยสุดยอดนางแบบ Liya Kebede เราได้ร่วมมือกันสร้างสรรค์สไตล์ที่โดดเด่นนี้ขึ้น.','1732884872365.avif'),(24,'Velocity NITRO™ 3','Running',4500,'Summer','U','รองเท้ารุ่น PUMA Velocity NITRO™ 3 เป็นสุดยอดรองเท้าในอุตสาหกรรมซึ่งเรานำเสนอให้แก่คุณ รองเท้ารุ่นนี้เน้นเรื่องความเร็วและความสบาย ด้วยเทคโนโลยี NITRO™ ','1732886427313.avif'),(25,'Velocity NITRO™ 2','Running',4500,'Summer','M','เริ่มต้นการเดินทางแห่งการวิ่งของคุณด้วย VELOCITY NITRO™ 3 ซึ่งเป็นแฟรนไชส์ฮีโร่ของ PUMA ที่มีระบบกันกระแทก NITROFOAM™ สไตล์โฉบเฉี่ยว ความสะดวกสบายที่โดดเด่น ','1732886463855.avif'),(26,'FAST-R NITRO 2','Running',8900,'Rainny','M','FAST-R NITRO™ ELITE 2 คือสุดยอดรองเท้าสําหรับวันแข่งจาก PUMA ด้วยเทคโนโลยี NITROFOAM™ ELITE และ PWRPLATE ที่ปรับปรุงใหม่','1732886553509.avif'),(27,'SOFTRIDE Carson Knit','Running',1092,'Winter','F','SOFTRIDE Carson นำรูปทรงการวิ่งอันเป็นเอกลักษณ์กลับมาอีกครั้ง ด้วยโฟมที่นุ่มที่สุดของเรา SOFTRIDE เพื่อการรองรับแรงกระแทกสูงสุดและความสบายตลอดทั้งวัน','1732886667841.avif'),(28,'AC Milan','Football',1218,'Winter','F','เสื้อชุดอเวย์ของทีม AC Milan ฤดูกาล 23/24 เกรดแฟนบอล (Replica)','1732887202317.avif'),(29,'Manchester City','Football',2200,'Winter','M','ฝึกซ้อมแบบแชมป์ในเสื้อแข่งพรีแมตช์แขนสั้นของ Manchester City ทรงสลิม ฟิต คอกลม และเทคโนโลยี dryCELL ที่ซับเหงื่อได้ดีของเรา ปรับแต่งเพื่อให้คุณมีสมาธิอย่างเต็มที่ก่อนแข่ง','1732887648518.avif'),(30,'Borussia Dortmund','Football',4600,'Winter','U','ขอแนะนําไอเทมล่าสุดจากทีมดำเหลืองสุดคลาสสิก ชุดเหย้า 24/25 ยังคงยึดมั่นในมรดกของสโมสร โดยผสมผสานสีสันอันเป็นเอกลักษณ์เข้ากับดีไซน์ลายแถบเล็กที่สะท้อนถึงแก่นแท้','1732887707049.avif'),(31,'FUTURE 7 ULTIMATE','Football',8000,'Winter','M','ผู้เล่นคนสำคัญทั้งหลาย มาก้าวสู่อนาคตอย่างมั่นคงกันเถอะ รองเท้ารุ่นนี้โดดเด่นด้วยส่วนบนที่ออกแบบใหม่ ซึ่งผสมผสาน PWRPRINT และ PWRTAPE เข้ากับผ้าถักที่ยืดหยุ่นได้มากเป็นพิเศษ','1732887829794.avif'),(32,'FUTURE 7 ULTIMATE CREATIVITY','Football',3840,'Winter','M','ผู้เล่นคนสำคัญทั้งหลาย มาก้าวสู่อนาคตอย่างมั่นคงกันเถอะ ส่วนบนที่ออกแบบใหม่ผสมผสานทั้ง PWRPRINT, PWRTAPE, ผ้าถักที่ยืดได้ดีเป็นพิเศษ และตาข่ายคู่เนื้อนุ่มที่ทันสมัย','1732887887112.avif'),(33,'FUTURE 7 ULTIMATE','Football',3840,'Winter','F','ผู้เล่นคนสำคัญทั้งหลาย มาก้าวสู่อนาคตอย่างมั่นคงกันเถอะ ส่วนบนที่ออกแบบใหม่ผสมผสานทั้ง PWRPRINT, PWRTAPE, ผ้าถักที่ยืดได้ดีเป็นพิเศษ และตาข่ายคู่เนื้อนุ่มที่ทันสมัย','1732888716562.avif'),(34,'PUMA SQUAD','Hat',700,'Rainny','M','พร้อมสำหรับสนามเบสบอลหรือสไตล์ในชีวิตประจำวัน หมวกเบสบอล PUMA Squad เป็นหมวกแก๊ปแบบหกแผงสุดคลาสสิกพร้อมด้านหลังแบบปรับได้เพื่อให้แน่ใจว่าสวมใส่ได้พอดี','1732888806768.avif');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-29 21:01:22
