CREATE DATABASE `db_intern`	


CREATE TABLE `userdata` (
  `userName` varchar(25) NOT NULL,
  `password` varchar(50) NOT NULL,
  `emailId` varchar(50) NOT NULL,
  `phoneNo` varchar(10) NOT NULL,
  `dateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`emailId`)
)	

