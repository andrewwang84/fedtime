-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2016-07-10 17:10:31
-- 伺服器版本: 10.1.13-MariaDB
-- PHP 版本： 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `fedtime`
--

-- --------------------------------------------------------

--
-- 資料表結構 `rate`
--

CREATE TABLE `rate` (
  `rid` int(11) NOT NULL,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rnum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `shop`
--

CREATE TABLE `shop` (
  `sid` int(11) NOT NULL,
  `hid` int(11) NOT NULL,
  `c_num` int(11) NOT NULL,
  `start_t` int(11) NOT NULL,
  `end_t` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `loc` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loc_city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tags` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `s_else` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `final_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 資料表的匯出資料 `shop`
--

INSERT INTO `shop` (`sid`, `hid`, `c_num`, `start_t`, `end_t`, `cost`, `loc`, `loc_city`, `phone`, `tags`, `s_else`, `final_status`) VALUES
(1, 123, 2, 1450559764, 1450559780, 150, 'aaa,aaa,aaa,aaaa', 'aaa,aaa', '', '0,1,9', '', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `uname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `agree` int(11) NOT NULL DEFAULT '0',
  `rate` int(11) NOT NULL DEFAULT '3',
  `sex` int(11) NOT NULL DEFAULT '0',
  `shop_suc` int(11) NOT NULL DEFAULT '0',
  `shop_fail` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 資料表的匯出資料 `user`
--

INSERT INTO `user` (`uid`, `uname`, `type`, `agree`, `rate`, `sex`, `shop_suc`, `shop_fail`) VALUES
(1, 'yrwang', 1, 1, 3, 1, 0, 0);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `rate`
--
ALTER TABLE `rate`
  ADD PRIMARY KEY (`rid`);

--
-- 資料表索引 `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `rate`
--
ALTER TABLE `rate`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `shop`
--
ALTER TABLE `shop`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用資料表 AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
