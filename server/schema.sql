DROP DATABASE IF EXISTS `student_management`;

CREATE DATABASE `student_management`;

USE `student_management`;

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `id` VARCHAR(8) NOT NULL PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `dob` VARCHAR(100) NOT NULL,
  `home` VARCHAR(100) NOT NULL
);

INSERT INTO `student` (id, name, dob, home) VALUES (21020469, "Nguyễn Đức Lộc", "05/08/2003", "Hải Dương");
INSERT INTO `student` (id, name, dob, home) VALUES (21020471, "Trần Quang Minh", "22/12/2003", "Nam Định");
INSERT INTO `student` (id, name, dob, home) VALUES (21021454, "Ngô Quý Bảo", "25/04/2003", "Hà Nội");
INSERT INTO `student` (id, name, dob, home) VALUES (21021472, "Nguyễn Văn Dương", "30/10/2003", "Hải Dương");
INSERT INTO `student` (id, name, dob, home) VALUES (21020201, "Trần Phương Hoa", "28/12/2003", "Hà Nội");
INSERT INTO `student` (id, name, dob, home) VALUES (21021498, "Trịnh Xuân Hoàng", "14/05/2003", "Hải Dương");
INSERT INTO `student` (id, name, dob, home) VALUES (21020465, "Phạm Việt Hoàng", "10/02/2003", "Hà Nội");
INSERT INTO `student` (id, name, dob, home) VALUES (21020239, "Phạm Văn Thạch", "23/11/2003", "Nghệ An");
INSERT INTO `student` (id, name, dob, home) VALUES (21020660, "Nguyễn Công Tuấn Phương", "15/11/2003", "Hà Nội");
