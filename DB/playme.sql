-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2020 a las 04:15:44
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `playme`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `albumes`
--

CREATE TABLE `albumes` (
  `alb_id` int(11) NOT NULL,
  `alb_nombre` varchar(50) DEFAULT '',
  `alb_foto` varchar(100) DEFAULT '',
  `alb_aniolanzamiento` varchar(4) DEFAULT NULL,
  `alb_idartista` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `albumes`
--

INSERT INTO `albumes` (`alb_id`, `alb_nombre`, `alb_foto`, `alb_aniolanzamiento`, `alb_idartista`) VALUES
(1, '\'74 Jailbreak', '../imagenes/Tapas/AC_DC_74jailbreak.jpg', '1983', 1),
(2, 'AC-DC Live', '../imagenes/Tapas/AC_DC_Live.jpg', '1991', 1),
(3, 'Back In Black', '../imagenes/Tapas/AC_DC_BackInBlack.jpg', '1979', 1),
(4, 'Ballbreaker', '../imagenes/Tapas/AC_DC_Ballbreaker.jpg', '1994', 1),
(5, 'Blow Up Your Video', '../imagenes/Tapas/AC_DC_BlowUpYourVideo.jpg', '1987', 1),
(6, 'Dirty Deeds Done Dirt Cheap', '../imagenes/Tapas/AC_DC_DirtyDeedsDoneDirtCheap.jpg', '1975', 1),
(7, 'Flick Of The Switch', '../imagenes/Tapas/AC_DC_FlickOfTheSwitch.jpg', '1982', 1),
(8, 'Fly On The Wall', '../imagenes/Tapas/AC_DC_FlyOnTheWall.jpg', '1984', 1),
(9, 'For Those About To Rock We Salute You', '../imagenes/Tapas/AC_DC_ForThoseAboutTheRock.jpg', '1980', 1),
(10, 'High Voltage', '../imagenes/Tapas/AC_DC_HighVoltage.jpg', '1975', 1),
(11, 'Highway To Hell', '../imagenes/Tapas/AC_DC_HighwayToHell.jpg', '1978', 1),
(12, 'If You Want Blood You\'ve Got It [Live]', '../imagenes/Tapas/AC_DC_IfYouWantBlood.jpg', '1977', 1),
(13, 'Let There Be Rock', '../imagenes/Tapas/AC_DC_LetThereBeRock.jpg', '1976', 1),
(14, 'Powerage', '../imagenes/Tapas/AC_DC_Powerage.jpg', '1977', 1),
(15, 'Stiff Upper Lip', '../imagenes/Tapas/AC_DC_StiffUperLip.jpg', '1999', 1),
(16, 'T.N.T', '../imagenes/Tapas/AC_DC_TNT.jpg', '1974', 1),
(17, 'The Razor\'s Edge', '../imagenes/Tapas/AC_DC_TheRazorsEdge.jpg', '1989', 1),
(18, 'Who Made Who', '../imagenes/Tapas/AC_DC_WhoMadeWho.jpg', '1985', 1),
(19, 'Lucille & Friends', '../imagenes/Tapas/BBKing_LucilleAndFriends.jpg', '1994', 2),
(20, 'Brothers In Arms', '../imagenes/Tapas/DireStraits_BrothersInArms.jpg', '1984', 3),
(21, 'Love Over Gold', '../imagenes/Tapas/DireStraits_LoveOverGold.jpg', '1981', 3),
(22, 'Money For Nothing', '../imagenes/Tapas/DireStraits_MoneyForNothing.jpg', '1987', 3),
(23, 'On Every Street', '../imagenes/Tapas/DireStraits_OnEveryStreet.jpg', '1990', 3),
(24, 'On The Night [Live]', '../imagenes/Tapas/DireStraits_OnTheNight.jpg', '1992', 3),
(25, 'Clapton Chronicles- The Best Of Eric Clapton', '../imagenes/Tapas/EricClapton_Chronicles.jpg', '1998', 4),
(26, 'The Baddest Of George Thorogood & The Destroyers', '../imagenes/Tapas/Thorogood_TheBadest.jpg', '1991', 5),
(27, 'A Real Live One', '../imagenes/Tapas/IronMaiden_ARealLive.jpg', '1993', 6),
(28, 'Can I Play With Madness-The Evil That Men Do [Sing', '../imagenes/Tapas/IronMaiden_CanIPlayWithMadness.jpg', '1990', 6),
(29, 'No Prayer For The Dying', '../imagenes/Tapas/IronMaiden_NoPrayerForTheDying.jpg', '1990', 6),
(30, 'Piece Of Mind', '../imagenes/Tapas/EronMaiden_PieceOfMind.jpg', '1983', 6),
(31, 'Powerslave', '../imagenes/Tapas/EronMaiden_Powerslave.jpg', '1984', 6),
(32, 'Running Free - Sanctuary', '../imagenes/Tapas/IronMaiden_RunningFree.jpg', '1990', 6),
(33, 'The Number Of The Beast', '../imagenes/Tapas/IronMaiden_TheNumberOfTheBeast.jpg', '1982', 6),
(34, 'The Division Bell', '../imagenes/Tapas/PinkFloyd_TheDivisionBell.jpg', '1994', 7),
(35, '1962-1966', '../imagenes/Tapas/TheBeatles_1962_1966.jpg', '1972', 8),
(36, '1967-1970', '../imagenes/Tapas/TheBeatles_1966_1970.jpg', '1972', 8),
(37, 'Please Please Me', '../imagenes/Tapas/TheBeatles_PleasePleaseMe.jpg', '1962', 8),
(38, 'Yellow Submarine', '../imagenes/Tapas/TheBeatles_YellowSubmarine.jpg', '1968', 8),
(39, 'Afterburner', '../imagenes/Tapas/ZZTop_Afterburner.jpg', '1985', 9),
(40, 'Eliminator', '../imagenes/Tapas/ZZTop_Eliminator.jpg', '1983', 9),
(41, 'Recycler', '../imagenes/Tapas/ZZTop_Recycler.jpg', '1990', 9),
(42, 'Rhythmeen', '../imagenes/Tapas/ZZTop_Rhythmeen.jpg', '1996', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artistas`
--

CREATE TABLE `artistas` (
  `art_id` int(11) NOT NULL,
  `art_nombre` varchar(50) DEFAULT '',
  `art_foto` varchar(100) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `artistas`
--

INSERT INTO `artistas` (`art_id`, `art_nombre`, `art_foto`) VALUES
(1, 'AC/DC', '../imagenes/Artistas/AC_DC.png'),
(2, 'BB King', '../imagenes/Artistas/BBKing.png'),
(3, 'Dire Straits', '../imagenes/Artistas/DireStraits.png'),
(4, 'Eric Clapton', '../imagenes/Artistas/EricClapton.png'),
(5, 'George Thorogood', '../imagenes/Artistas/GeorgeThorogood.png'),
(6, 'Iron Maiden', '../imagenes/Artistas/IronMaiden.png'),
(7, 'Pink Floyd', '../imagenes/Artistas/PinkFloyd.png'),
(8, 'The Beatles', '../imagenes/Artistas/PinkFloyd.png'),
(9, 'ZZ Top', '../imagenes/Artistas/ZZTop.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones`
--

CREATE TABLE `canciones` (
  `can_id` int(11) NOT NULL,
  `can_nombre` varchar(50) DEFAULT '',
  `can_url` varchar(100) DEFAULT '',
  `can_idalbum` int(11) DEFAULT NULL,
  `can_idgenero` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritas`
--

CREATE TABLE `favoritas` (
  `fav_id` int(11) NOT NULL,
  `fav_idusuario` int(11) DEFAULT NULL,
  `fav_idcancion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `gen_id` int(11) NOT NULL,
  `gen_nombre` varchar(30) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`gen_id`, `gen_nombre`) VALUES
(1, 'HardRock'),
(2, 'Rock'),
(3, 'Blues'),
(4, 'HeavyMetal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preferencias`
--

CREATE TABLE `preferencias` (
  `pre_id` int(11) NOT NULL,
  `pre_idusuario` int(11) DEFAULT NULL,
  `pre_idgenero` int(11) DEFAULT NULL,
  `pre_cantidadveces` mediumint(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `res_id` int(11) NOT NULL,
  `res_idpregunta` tinyint(4) DEFAULT NULL,
  `res_texto` varchar(50) DEFAULT NULL,
  `res_idusuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`res_id`, `res_idpregunta`, `res_texto`, `res_idusuario`) VALUES
(44, 1, 'Pizza', 15),
(45, 2, 'Pimy', 15),
(46, 3, 'AC/DC', 15),
(47, 1, 'Pizza', 16),
(48, 2, 'Py', 16),
(49, 6, 'Ramirez', 16),
(50, 1, 'Torta', 17),
(51, 3, 'Led Zeppelin', 17),
(52, 6, 'Nogoyá', 17),
(53, 1, 'Pizza', 18),
(54, 2, 'Tita', 18),
(55, 3, 'Los Palmeras', 18),
(56, 2, 'Tiny', 19),
(57, 3, 'Pipo pescador', 19),
(58, 4, 'La venganza de los pitufos 2', 19),
(59, 1, 'a', 20),
(60, 2, 'b', 20),
(61, 3, 'c', 20),
(62, 1, 'a', 21),
(63, 2, 'sdas', 21),
(64, 3, 'asdfs', 21),
(65, 1, 'a', 22),
(66, 2, 'a', 22),
(67, 3, 'a', 22),
(68, 1, 'a', 23),
(69, 2, 'b', 23),
(70, 3, 'c', 23),
(71, 1, 'a', 24),
(72, 2, 'a', 24),
(73, 3, 'a', 24),
(74, 1, 'a', 25),
(75, 2, 'a', 25),
(76, 3, 'a', 25),
(77, 1, 'a', 26),
(78, 2, 'a', 26),
(79, 3, 'a', 26),
(80, 1, 'a', 27),
(81, 2, 'a', 27),
(82, 3, 'a', 27),
(83, 1, 'a', 28),
(84, 2, 'a', 28),
(85, 3, 'a', 28),
(86, 1, 'a', 29),
(87, 2, 'a', 29),
(88, 3, 'a', 29),
(89, 1, 'a', 30),
(90, 2, 'a', 30),
(91, 3, 'a', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usu_id` int(11) NOT NULL,
  `usu_usuario` varchar(30) DEFAULT '',
  `usu_contrasenia` varchar(40) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usu_id`, `usu_usuario`, `usu_contrasenia`) VALUES
(15, 'Hugo', 'aaaaaaA1'),
(16, 'Lala', 'bbbbbbB1'),
(17, 'Roberto', 'aaaaaaA1'),
(18, 'Paola', 'aaaaaaA1'),
(19, 'Ruben', 'eeeeeeE1'),
(20, 'Nino', 'aaaaaaA1'),
(21, 'Leo3', 'aaaaaaA1'),
(22, 'Leo', 'aaaaaaA1'),
(23, 'Pablo', 'aaaaaaA1'),
(24, 'a', 'aaaaaaA1'),
(25, 'b', 'aaaaaaA1'),
(26, 'c', 'aaaaaaA1'),
(27, 'd', 'aaaaaaA1'),
(28, 'e', 'aaaaaaA1'),
(29, 'f', 'aaaaaaA1'),
(30, 'g', 'aaaaaaA1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD PRIMARY KEY (`alb_id`),
  ADD KEY `alb_idartista` (`alb_idartista`);

--
-- Indices de la tabla `artistas`
--
ALTER TABLE `artistas`
  ADD PRIMARY KEY (`art_id`);

--
-- Indices de la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD PRIMARY KEY (`can_id`),
  ADD KEY `can_idalbum` (`can_idalbum`),
  ADD KEY `can_idgenero` (`can_idgenero`);

--
-- Indices de la tabla `favoritas`
--
ALTER TABLE `favoritas`
  ADD PRIMARY KEY (`fav_id`),
  ADD KEY `fav_idusuario` (`fav_idusuario`),
  ADD KEY `fav_idcancion` (`fav_idcancion`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`gen_id`);

--
-- Indices de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD PRIMARY KEY (`pre_id`),
  ADD KEY `pre_idusuario` (`pre_idusuario`),
  ADD KEY `pre_idgenero` (`pre_idgenero`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`res_id`),
  ADD KEY `res_idusuario` (`res_idusuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usu_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `albumes`
--
ALTER TABLE `albumes`
  MODIFY `alb_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `artistas`
--
ALTER TABLE `artistas`
  MODIFY `art_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `canciones`
--
ALTER TABLE `canciones`
  MODIFY `can_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `favoritas`
--
ALTER TABLE `favoritas`
  MODIFY `fav_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `gen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `preferencias`
--
ALTER TABLE `preferencias`
  MODIFY `pre_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `res_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `albumes`
--
ALTER TABLE `albumes`
  ADD CONSTRAINT `albumes_ibfk_1` FOREIGN KEY (`alb_idartista`) REFERENCES `artistas` (`art_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD CONSTRAINT `canciones_ibfk_1` FOREIGN KEY (`can_idalbum`) REFERENCES `albumes` (`alb_id`),
  ADD CONSTRAINT `canciones_ibfk_2` FOREIGN KEY (`can_idgenero`) REFERENCES `generos` (`gen_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `favoritas`
--
ALTER TABLE `favoritas`
  ADD CONSTRAINT `favoritas_ibfk_1` FOREIGN KEY (`fav_idusuario`) REFERENCES `usuarios` (`usu_id`),
  ADD CONSTRAINT `favoritas_ibfk_2` FOREIGN KEY (`fav_idcancion`) REFERENCES `canciones` (`can_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `preferencias`
--
ALTER TABLE `preferencias`
  ADD CONSTRAINT `preferencias_ibfk_1` FOREIGN KEY (`pre_idusuario`) REFERENCES `usuarios` (`usu_id`),
  ADD CONSTRAINT `preferencias_ibfk_2` FOREIGN KEY (`pre_idgenero`) REFERENCES `generos` (`gen_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`res_idusuario`) REFERENCES `usuarios` (`usu_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
