/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 100425
 Source Host           : localhost:3306
 Source Schema         : obridge

 Target Server Type    : MySQL
 Target Server Version : 100425
 File Encoding         : 65001

 Date: 28/02/2023 12:52:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions`  (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `fToken` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tToken` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fAddress` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tAddress` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `amount` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fChainID` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tChainID` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fTxnID` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `tTxnID` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `form` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
