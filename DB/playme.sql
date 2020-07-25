-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-07-2020 a las 05:59:03
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
  `alb_nombre` varchar(50) DEFAULT NULL,
  `alb_foto` varchar(200) DEFAULT NULL,
  `alb_aniolanzamiento` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `albumes`
--

INSERT INTO `albumes` (`alb_id`, `alb_nombre`, `alb_foto`, `alb_aniolanzamiento`) VALUES
(1, '\'74 Jailbreak', '../imagenes/Tapas/AC_DC_74jailbreak.jpg', '1984'),
(2, 'AC-DC Live', '../imagenes/Tapas/AC_DC_Live.jpg', '1992'),
(3, 'Back In Black', '../imagenes/Tapas/AC_DC_BackInBlack.jpg', '1980'),
(4, 'Ballbreaker', '../imagenes/Tapas/AC_DC_Ballbreaker.jpg', '1995'),
(5, 'Blow Up Your Video', '../imagenes/Tapas/AC_DC_BlowUpYourVideo.jpg', '1988'),
(6, 'Dirty Deeds Done Dirt Cheap', '../imagenes/Tapas/AC_DC_DirtyDeedsDoneDirtCheap.jpg', '1976'),
(7, 'Flick Of The Switch', '../imagenes/Tapas/AC_DC_FlickOfTheSwitch.jpg', '1983'),
(8, 'Fly On The Wall', '../imagenes/Tapas/AC_DC_FlyOnTheWall.jpg', '1985'),
(9, 'For Those About To Rock We Salute You', '../imagenes/Tapas/AC_DC_ForThoseAboutTheRock.jpg', '1981'),
(10, 'High Voltage', '../imagenes/Tapas/AC_DC_HighVoltage.jpg', '1976'),
(11, 'Highway To Hell', '../imagenes/Tapas/AC_DC_HighwayToHell.jpg', '1979'),
(12, 'If You Want Blood You\'ve Got It [Live]', '../imagenes/Tapas/AC_DC_IfYouWantBlood.jpg', '1978'),
(13, 'Let There Be Rock', '../imagenes/Tapas/AC_DC_LetThereBeRock.jpg', '1977'),
(14, 'Powerage', '../imagenes/Tapas/AC_DC_Powerage.jpg', '1978'),
(15, 'Stiff Upper Lip', '../imagenes/Tapas/AC_DC_StiffUperLip.jpg', '2000'),
(16, 'T.N.T', '../imagenes/Tapas/AC_DC_TNT.jpg', '1975'),
(17, 'The Razor\'s Edge', '../imagenes/Tapas/AC_DC_TheRazorsEdge.jpg', '1990'),
(18, 'Who Made Who', '../imagenes/Tapas/AC_DC_WhoMadeWho.jpg', '1986'),
(19, 'Lucille & Friends', '../imagenes/Tapas/BBKing_LucilleAndFriends.jpg', '1995'),
(20, 'Brothers In Arms', '../imagenes/Tapas/DireStraits_BrothersInArms.jpg', '1985'),
(21, 'Love Over Gold', '../imagenes/Tapas/DireStraits_LoveOverGold.jpg', '1982'),
(22, 'Money For Nothing', '../imagenes/Tapas/DireStraits_MoneyForNothing.jpg', '1988'),
(23, 'On Every Street', '../imagenes/Tapas/DireStraits_OnEveryStreet.jpg', '1991'),
(24, 'On The Night [Live]', '../imagenes/Tapas/DireStraits_OnTheNight.jpg', '1993'),
(25, 'Clapton Chronicles- The Best Of Eric Clapton', '../imagenes/Tapas/EricClapton_Chronicles.jpg', '1999'),
(26, 'The Baddest Of George Thorogood & The Destroyers', '../imagenes/Tapas/Thorogood_TheBadest.jpg', '1992'),
(27, 'A Real Live One', '../imagenes/Tapas/IronMaiden_ARealLive.jpg', '1993'),
(28, 'Can I Play With Madness-The Evil That Men Do [Sing', '../imagenes/Tapas/IronMaiden_CanIPlayWithMadness.jpg', '1990'),
(29, 'No Prayer For The Dying', '../imagenes/Tapas/IronMaiden_NoPrayerForTheDying.jpg', '1990'),
(30, 'Piece Of Mind', '../imagenes/Tapas/IronMaiden_PieceOfMind.jpg', '1983'),
(31, 'Powerslave', '../imagenes/Tapas/IronMaiden_Powerslave.jpg', '1984'),
(32, 'Running Free - Sanctuary', '../imagenes/Tapas/IronMaiden_RunningFree.jpg', '1990'),
(33, 'The Number Of The Beast', '../imagenes/Tapas/IronMaiden_TheNumberOfTheBeast.jpg', '1982'),
(34, 'The Division Bell', '../imagenes/Tapas/PinkFloyd_TheDivisionBell.jpg', '1994'),
(35, '1962-1966', '../imagenes/Tapas/TheBeatles_1962_1966.jpg', '1972'),
(36, '1967-1970', '../imagenes/Tapas/TheBeatles_1966_1970.jpg', '1972'),
(37, 'Please Please Me', '../imagenes/Tapas/TheBeatles_PleasePleaseMe.jpg', '1963'),
(38, 'Yellow Submarine', '../imagenes/Tapas/TheBeatles_YellowSubmarine.jpg', '1969'),
(39, 'Afterburner', '../imagenes/Tapas/ZZTop_Afterburner.jpg', '1985'),
(40, 'Eliminator', '../imagenes/Tapas/ZZTop_Eliminator.jpg', '1983'),
(41, 'Recycler', '../imagenes/Tapas/ZZTop_Recycler.jpg', '1990'),
(42, 'Rhythmeen', '../imagenes/Tapas/ZZTop_Rhythmeen.jpg', '1996');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artistas`
--

CREATE TABLE `artistas` (
  `art_id` int(11) NOT NULL,
  `art_nombre` varchar(50) DEFAULT NULL,
  `art_foto` varchar(200) DEFAULT NULL
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
(8, 'The Beatles', '../imagenes/Artistas/TheBeatles.png'),
(9, 'ZZ Top', '../imagenes/Artistas/ZZTop.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones`
--

CREATE TABLE `canciones` (
  `can_id` int(11) NOT NULL,
  `can_nombre` varchar(100) DEFAULT NULL,
  `can_url` varchar(200) DEFAULT NULL,
  `can_idgenero` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `canciones`
--

INSERT INTO `canciones` (`can_id`, `can_nombre`, `can_url`, `can_idgenero`) VALUES
(1, '01 Jailbreak', '../Albumes/AC-DC/\'74 Jailbreak/01 Jailbreak.mp3', 1),
(2, '02 You Ain\'t Got A Hold On Me', '../Albumes/AC-DC/\'74 Jailbreak/02 You Ain\'t Got A Hold On Me.mp3', 1),
(3, '03 Show Business', '../Albumes/AC-DC/\'74 Jailbreak/03 Show Business.mp3', 1),
(4, '04 Soul Stripper', '../Albumes/AC-DC/\'74 Jailbreak/04 Soul Stripper.mp3', 1),
(5, '05 Baby, Please Don\'t Go', '../Albumes/AC-DC/\'74 Jailbreak/05 Baby, Please Don\'t Go.mp3', 1),
(6, '01 Thunderstruck [Live]', '../Albumes/AC-DC/AC-DC Live/01 Thunderstruck [Live].mp3', 1),
(7, '02 Shoot To Thrill [Live]', '../Albumes/AC-DC/AC-DC Live/02 Shoot To Thrill [Live].mp3', 1),
(8, '03 Back In Black [Live]', '../Albumes/AC-DC/AC-DC Live/03 Back In Black [Live]', 1),
(9, '04 Who Made Who [Live]', '../Albumes/AC-DC/AC-DC Live/04 Who Made Who [Live].mp3', 1),
(10, '05 Heatseeker [Live]', '../Albumes/AC-DC/AC-DC Live/05 Heatseeker [Live].mp3', 1),
(11, '06 The Jack [Live]', '../Albumes/AC-DC/AC-DC Live/06 The Jack [Live].mp3', 1),
(12, '07 Moneytalks [Live]', '../Albumes/AC-DC/AC-DC Live/07 Moneytalks [Live].mp3', 1),
(13, '08 Hells Bells [Live]', '../Albumes/AC-DC/AC-DC Live/08 Hells Bells [Live].mp3', 1),
(14, '09 Dirty Deeds Done Dirt Cheap [Live]', '../Albumes/AC-DC/AC-DC Live/09 Dirty Deeds Done Dirt Cheap [Live].mp3', 1),
(15, '10 Whole Lotta Rosie [Live]', '../Albumes/AC-DC/AC-DC Live/10 Whole Lotta Rosie [Live].mp3', 1),
(16, '11 You Shook Me All Night Long [Live]', '../Albumes/AC-DC/AC-DC Live/11 You Shook Me All Night Long [Live].mp3', 1),
(17, '12 Highway To Hell [Live]', '../Albumes/AC-DC/AC-DC Live/12 Highway To Hell [Live].mp3', 1),
(18, '13 T.N.T. [Live]', '../Albumes/AC-DC/AC-DC Live/13 T.N.T. [Live].mp3', 1),
(19, '14 For Those About To Rock (We Salute You) [Live]', '../Albumes/AC-DC/AC-DC Live/14 For Those About To Rock (We Salute You) [Live].mp3', 1),
(20, '01 Hells Bells', '../Albumes/AC-DC/Back In Black/01 Hells Bells.mp3', 1),
(21, '02 Shoot To Thrill', '../Albumes/AC-DC/Back In Black/02 Shoot To Thrill.mp3', 1),
(22, '03 What Do You Do For Money Honey', '../Albumes/AC-DC/Back In Black/03 What Do You Do For Money Honey.mp3', 1),
(23, '04 Given The Dog A Bone', '../Albumes/AC-DC/Back In Black/04 Given The Dog A Bone.mp3', 1),
(24, '05 Let Me Put My Love Into You', '../Albumes/AC-DC/Back In Black/05 Let Me Put My Love Into You.mp3', 1),
(25, '06 Back In Black', '../Albumes/AC-DC/Back In Black/06 Back In Black.mp3', 1),
(26, '07 You Shook Me All Night Long', '../Albumes/AC-DC/Back In Black/07 You Shook Me All Night Long.mp3', 1),
(27, '08 Have A Drink On Me', '../Albumes/AC-DC/Back In Black/08 Have A Drink On Me.mp3', 1),
(28, '09 Shake A Leg', '../Albumes/AC-DC/Back In Black/09 Shake A Leg.mp3', 1),
(29, '10 Rock And Roll Ain\'t Noise Pollution', '../Albumes/AC-DC/Back In Black/10 Rock And Roll Ain\'t Noise Pollution.mp3', 1),
(30, '01 Hard As A Rock', '../Albumes/AC-DC/Ballbreaker/01 Hard As A Rock.mp3', 1),
(31, '02 Cover You In Oil', '../Albumes/AC-DC/Ballbreaker/02 Cover You In Oil.mp3', 1),
(32, '03 The Furor', '../Albumes/AC-DC/Ballbreaker/03 The Furor.mp3', 1),
(33, '04 Boogie Man', '../Albumes/AC-DC/Ballbreaker/04 Boogie Man.mp3', 1),
(34, '05 Honey Roll', '../Albumes/AC-DC/Ballbreaker/05 Honey Roll.mp3', 1),
(35, '06 Burnin\' Alive', '../Albumes/AC-DC/Ballbreaker/06 Burnin\' Alive.mp3', 1),
(36, '07 Hail Caesar', '../Albumes/AC-DC/Ballbreaker/07 Hail Caesar.mp3', 1),
(37, '08 Love Bomb', '../Albumes/AC-DC/Ballbreaker/08 Love Bomb.mp3', 1),
(38, '09 Caught With Your Pants Down', '../Albumes/AC-DC/Ballbreaker/09 Caught With Your Pants Down.mp3', 1),
(39, '10 Whiskey On The Rocks', '../Albumes/AC-DC/Ballbreaker/10 Whiskey On The Rocks.mp3', 1),
(40, '11 Ball Breaker', '../Albumes/AC-DC/Ballbreaker/11 Ball Breaker.mp3', 1),
(44, '01 Heatseeker', '../Albumes/AC-DC/Blow Up Your Video/01 Heatseeker.mp3', 1),
(45, '02 That\'s The Way I Wanna Rock \'n\' Roll', '../Albumes/AC-DC/Blow Up Your Video/02 That\'s The Way I Wanna Rock \'n\' Roll.mp3', 1),
(46, '03 Meanstreak', '../Albumes/AC-DC/Blow Up Your Video/03 Meanstreak.mp3', 1),
(47, '04 Go Zone', '../Albumes/AC-DC/Blow Up Your Video/04 Go Zone.mp3', 1),
(48, '05 Kissin\' Dynamite', '../Albumes/AC-DC/Blow Up Your Video/05 Kissin\' Dynamite.mp3', 1),
(49, '06 Nick Of Time\' Dynamite', '../Albumes/AC-DC/Blow Up Your Video/06 Nick Of Time.mp3', 1),
(50, '07 Some Sin For Nuthin\'', '../Albumes/AC-DC/Blow Up Your Video/07 Some Sin For Nuthin\'.mp3', 1),
(51, '08 Ruff Stuff', '../Albumes/AC-DC/Blow Up Your Video/08 Ruff Stuff.mp3', 1),
(52, '09 Two\'s Up', '../Albumes/AC-DC/Blow Up Your Video/09 Two\'s Up.mp3', 1),
(53, '10 This Means War', '../Albumes/AC-DC/Blow Up Your Video/10 This Means War.mp3', 1),
(54, '01 Dirty Deeds Done Dirt Cheap', '../Albumes/AC-DC/Dirty Deeds Done Dirt Cheap/01 Dirty Deeds Done Dirt Cheap.mp3', 1),
(55, '02 Love At First Feel', '../Albumes/AC-DC/Dirty Deeds Done Dirt Cheap/02 Love At First Feel.mp3', 1),
(56, '03 Big Balls', '../Albumes/AC-DC/Dirty Deeds Done Dirt Cheap/03 Big Balls.mp3', 1),
(57, '04 Rocker', '../Albumes/AC-DC/Dirty Deeds Done Dirt Cheap/04 Rocker.mp3', 1),
(58, '05 Problem Child', '../Albumes/AC-DC/Dirty Deeds Done Dirt Cheap/05 Problem Child.mp3', 1),
(59, '06 There\'s Gonna Be Some Rockin\'', '../Albumes/AC-DC/Dirty Deeds Done Dirt Cheap/06 There\'s Gonna Be Some Rockin\'.mp3', 1),
(60, '07 Ain\'t No Fun (Waiting Round To Be A Millionaire', '../Albumes/AC-DC/Dirty Deeds Done Dirt Cheap/07 Ain\'t No Fun (Waiting Round To Be A Millionaire).mp3', 1),
(61, '08 Ride On', '../Albumes/AC-DC/Dirty Deeds Done Dirt Cheap/08 Ride On.mp3', 1),
(62, '09 Squealer', '../Albumes/AC-DC/Dirty Deeds Done Dirt Cheap/09 Squealer.mp3', 1),
(63, '01 Rising Power', '../Albumes/AC-DC/Flick Of The Switch/01 Rising Power.mp3', 1),
(64, '02 This House Is On Fire', '../Albumes/AC-DC/Flick Of The Switch/02 This House Is On Fire.mp3', 1),
(65, '03 Flick Of The Switch', '../Albumes/AC-DC/Flick Of The Switch/03 Flick Of The Switch.mp3', 1),
(66, '04 Nervous Shakedown', '../Albumes/AC-DC/Flick Of The Switch/04 Nervous Shakedown.mp3', 1),
(67, '05 Landslide', '../Albumes/AC-DC/Flick Of The Switch/05 Landslide.mp3', 1),
(68, '06 Guns For Hire', '../Albumes/AC-DC/Flick Of The Switch/06 Guns For Hire.mp3', 1),
(69, '07 Deep In The Hole', '../Albumes/AC-DC/Flick Of The Switch/07 Deep In The Hole.mp3', 1),
(70, '08 Bedlam In Belgium', '../Albumes/AC-DC/Flick Of The Switch/08 Bedlam In Belgium.mp3', 1),
(71, '09 Badlands', '../Albumes/AC-DC/Flick Of The Switch/09 Badlands.mp3', 1),
(72, '10 Brain Shake', '../Albumes/AC-DC/Flick Of The Switch/10 Brain Shake.mp3', 1),
(73, '01 Fly On The Wall', '../Albumes/AC-DC/Fly On The Wall/01 Fly On The Wall.mp3', 1),
(74, '02 Shake Your Foundations', '../Albumes/AC-DC/Fly On The Wall/02 Shake Your Foundations.mp3', 1),
(75, '03 First Blood', '../Albumes/AC-DC/Fly On The Wall/03 First Blood.mp3', 1),
(76, '04 Danger', '../Albumes/AC-DC/Fly On The Wall/04 Danger.mp3', 1),
(77, '05 Sink The Pink', '../Albumes/AC-DC/Fly On The Wall/05 Sink The Pink.mp3', 1),
(78, '06 Playing With Girls', '../Albumes/AC-DC/Fly On The Wall/06 Playing With Girls.mp3', 1),
(79, '07 Stand Up', '../Albumes/AC-DC/Fly On The Wall/07 Stand Up.mp3', 1),
(80, '08 Hell Or High Water', '../Albumes/AC-DC/Fly On The Wall/08 Hell Or High Water.mp3', 1),
(81, '09 Back In Business', '../Albumes/AC-DC/Fly On The Wall/09 Back In Business.mp3', 1),
(82, '10 Send For The Man', '../Albumes/AC-DC/Fly On The Wall/10 Send For The Man.mp3', 1),
(83, '01 For Those About To Rock (We Salute You)', '../Albumes/AC-DC/For Those About To Rock We Salute You/01 For Those About To Rock (We Salute You).mp', 1),
(84, '02 Put The Finger On You', '../Albumes/AC-DC/For Those About To Rock We Salute You/02 Put The Finger On You.mp3', 1),
(85, '03 Let\'s Get It Up', '../Albumes/AC-DC/For Those About To Rock We Salute You/03 Let\'s Get It Up.mp3', 1),
(86, '04 Inject The Venom', '../Albumes/AC-DC/For Those About To Rock We Salute You/04 Inject The Venom.mp3', 1),
(87, '05 Snowballed', '../Albumes/AC-DC/For Those About To Rock We Salute You/05 Snowballed.mp3', 1),
(88, '06 Evil Walks', '../Albumes/AC-DC/For Those About To Rock We Salute You/06 Evil Walks.mp3', 1),
(89, '07 C.O.D', '../Albumes/AC-DC/For Those About To Rock We Salute You/07 C.O.D.mp3', 1),
(90, '08 Breaking The Rules', '../Albumes/AC-DC/For Those About To Rock We Salute You/08 Breaking The Rules.mp3', 1),
(91, '09 Night Of The Long Knives', '../Albumes/AC-DC/For Those About To Rock We Salute You/09 Night Of The Long Knives.mp3', 1),
(92, '10 Spellbound', '../Albumes/AC-DC/For Those About To Rock We Salute You/10 Spellbound.mp3', 1),
(93, '01 It\'s A Long Way To The Top (If You Wanna Rock \'n\' Roll)', '../Albumes/AC-DC/High Voltage/01 It\'s A Long Way To The Top (If You Wanna Rock \'n\' Roll).mp3', 1),
(94, '02 Rock \'n\' Roll Singer', '../Albumes/AC-DC/High Voltage/02 Rock \'n\' Roll Singer.mp3', 1),
(95, '03 The Jack', '../Albumes/AC-DC/High Voltage/03 The Jack.mp3', 1),
(96, '04 Live Wire', '../Albumes/AC-DC/High Voltage/04 Live Wire.mp3', 1),
(97, '05 T.N.T', '../Albumes/AC-DC/High Voltage/05 T.N.T.mp3', 1),
(98, '06 Can I Sit Next To You Girl', '../Albumes/AC-DC/High Voltage/06 Can I Sit Next To You Girl.mp3', 1),
(99, '07 Little Lover', '../Albumes/AC-DC/High Voltage/07 Little Lover.mp3', 1),
(100, '08 She\'s Got Balls', '../Albumes/AC-DC/High Voltage/08 She\'s Got Balls.mp3', 1),
(101, '09 High Voltage', '../Albumes/AC-DC/High Voltage/09 High Voltage.mp3', 1),
(102, '01 Highway To Hell', '../Albumes/AC-DC/Highway To Hell/01 Highway To Hell.mp3', 1),
(103, '02 Girls Got Rhythm', '../Albumes/AC-DC/Highway To Hell/02 Girls Got Rhythm.mp3', 1),
(104, '03 Walk All Over You', '../Albumes/AC-DC/Highway To Hell/03 Walk All Over You.mp3', 1),
(105, '04 Touch Too Much', '../Albumes/AC-DC/Highway To Hell/04 Touch Too Much.mp3', 1),
(106, '05 Beating Around The Bush', '../Albumes/AC-DC/Highway To Hell/05 Beating Around The Bush.mp3', 1),
(107, '06 Shot Down In Flames', '../Albumes/AC-DC/Highway To Hell/06 Shot Down In Flames.mp3', 1),
(108, '07 Get It Hot', '../Albumes/AC-DC/Highway To Hell/07 Get It Hot.mp3', 1),
(109, '08 If You Want Blood (You\'ve Got It)', '../Albumes/AC-DC/Highway To Hell/08 If You Want Blood (You\'ve Got It).mp3', 1),
(110, '09 Love Hungry Man', '../Albumes/AC-DC/Highway To Hell/09 Love Hungry Man.mp3', 1),
(111, '10 Night Prowler', '../Albumes/AC-DC/Highway To Hell/10 Night Prowler.mp3', 1),
(112, '01 Riff Raff', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/01 Riff Raff.mp3', 1),
(113, '02 Hell Ain\'t A Bad Place To Be', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/02 Hell Ain\'t A Bad Place To Be.mp3', 1),
(114, '03 Bad Boy Boogie', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/03 Bad Boy Boogie.mp3', 1),
(115, '04 The Jack', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/04 The Jack.mp3', 1),
(116, '05 Problem Child', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/05 Problem Child.mp3', 1),
(117, '06 Whole Lotta Rosie', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/06 Whole Lotta Rosie.mp3', 1),
(118, '07 Rock \'N\' Roll Damnation', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/07 Rock \'N\' Roll Damnation.mp3', 1),
(119, '08 High Voltage', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/08 High Voltage.mp3', 1),
(120, '09 Let There Be Rock', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/09 Let There Be Rock.mp3', 1),
(121, '10 Rocker', '../Albumes/AC-DC/If You Want Blood You\'ve Got It [Live]/10 Rocker.mp3', 1),
(122, '01 Go Down', '../Albumes/AC-DC/Let There Be Rock/01 Go Down.mp3', 1),
(123, '02 Dog Eat Dog', '../Albumes/AC-DC/Let There Be Rock/02 Dog Eat Dog.mp3', 1),
(124, '03 Let There Be Rock', '../Albumes/AC-DC/Let There Be Rock/03 Let There Be Rock.mp3', 1),
(125, '04 Bad Boy Boogie', '../Albumes/AC-DC/Let There Be Rock/04 Bad Boy Boogie.mp3', 1),
(126, '05 Problem Child', '../Albumes/AC-DC/Let There Be Rock/05 Problem Child.mp3', 1),
(127, '06 Overdose', '../Albumes/AC-DC/Let There Be Rock/06 Overdose.mp3', 1),
(128, '07 Hell Ain\'t A Bad Place To Be', '../Albumes/AC-DC/Let There Be Rock/07 Hell Ain\'t A Bad Place To Be.mp3', 1),
(129, '08 Whole Lotta Rosie', '../Albumes/AC-DC/Let There Be Rock/08 Whole Lotta Rosie.mp3', 1),
(130, '01 Rock \'n\' Roll Damnation', '../Albumes/AC-DC/Powerage/01 Rock \'n\' Roll Damnation.mp3', 1),
(131, '02 Down Payment Blues', '../Albumes/AC-DC/Powerage/02 Down Payment Blues.mp3', 1),
(132, '03 Gimme A Bullet', '../Albumes/AC-DC/Powerage/03 Gimme A Bullet.mp3', 1),
(133, '04 Riff Raff', '../Albumes/AC-DC/Powerage/04 Riff Raff.mp3', 1),
(134, '05 Sin City', '../Albumes/AC-DC/Powerage/05 Sin City.mp3', 1),
(135, '06 What\'s Next To The Moon', '../Albumes/AC-DC/Powerage/06 What\'s Next To The Moon.mp3', 1),
(136, '07 Gone Shootin\'', '../Albumes/AC-DC/Powerage/07 Gone Shootin\'.mp3', 1),
(137, '08 Up To My Neck In You', '../Albumes/AC-DC/Powerage/08 Up To My Neck In You.mp3', 1),
(138, '09 Kicked In The Teeth', '../Albumes/AC-DC/Powerage/09 Kicked In The Teeth.mp3', 1),
(139, '01 Stiff Upper Lip', '../Albumes/AC-DC/Stiff Upper Lip/01 Stiff Upper Lip.mp3', 1),
(140, '02 Meltdown', '../Albumes/AC-DC/Stiff Upper Lip/02 Meltdown.mp3', 1),
(141, '03 House Of Jazz', '../Albumes/AC-DC/Stiff Upper Lip/03 House Of Jazz.mp3', 1),
(142, '04 Hold Me Back', '../Albumes/AC-DC/Stiff Upper Lip/04 Hold Me Back.mp3', 1),
(143, '05 Safe In New York City', '../Albumes/AC-DC/Stiff Upper Lip/05 Safe In New York City.mp3', 1),
(144, '06 Can\'t Stand Still', '../Albumes/AC-DC/Stiff Upper Lip/06 Can\'t Stand Still.mp3', 1),
(145, '07 Can\'t Stop Rock \'N\' Roll', '../Albumes/AC-DC/Stiff Upper Lip/07 Can\'t Stop Rock \'N\' Roll.mp3', 1),
(146, '08 Satellite Blues', '../Albumes/AC-DC/Stiff Upper Lip/08 Satellite Blues.mp3', 1),
(147, '09 Damned', '../Albumes/AC-DC/Stiff Upper Lip/09 Damned.mp3', 1),
(148, '10 Come And Get It', '../Albumes/AC-DC/Stiff Upper Lip/10 Come And Get It.mp3', 1),
(149, '11 All Screwed Up', '../Albumes/AC-DC/Stiff Upper Lip/11 All Screwed Up.mp3', 1),
(150, '12 Give It Up', '../Albumes/AC-DC/Stiff Upper Lip/12 Give It Up.mp3', 1),
(151, '01 It\'s A Long Way To The Top (If You Wanna Rock \'n\' Roll)', '../Albumes/AC-DC/T.N.T/01 It\'s A Long Way To The Top (If You Wanna Rock \'n\' Roll).mp3', 1),
(152, '02 Rock \'n\' Roll Singer', '../Albumes/AC-DC/T.N.T/02 Rock \'n\' Roll Singer.mp3', 1),
(153, '03 The Jack', '../Albumes/AC-DC/T.N.T/03 The Jack.mp3', 1),
(154, '04 Live Wire', '../Albumes/AC-DC/T.N.T/04 Live Wire.mp3', 1),
(155, '05 T.N.T', '../Albumes/AC-DC/T.N.T/05 T.N.T.mp3', 1),
(156, '06 Rocker', '../Albumes/AC-DC/T.N.T/06 Rocker.mp3', 1),
(157, '07 Can I Sit Next To You Girl-', '../Albumes/AC-DC/T.N.T/07 Can I Sit Next To You Girl-.mp3', 1),
(158, '08 High Voltage', '../Albumes/AC-DC/T.N.T/08 High Voltage.mp3', 1),
(159, '09 School Days', '../Albumes/AC-DC/T.N.T/09 School Days.mp3', 1),
(160, '01 Thunderstruck', '../Albumes/AC-DC/The Razor\'s Edge/01 Thunderstruck.mp3', 1),
(161, '02 Fire Your Guns', '../Albumes/AC-DC/The Razor\'s Edge/02 Fire Your Guns.mp3', 1),
(162, '03 Money Talks', '../Albumes/AC-DC/The Razor\'s Edge/03 Money Talks.mp3', 1),
(163, '04 The Razor\'s Edge', '../Albumes/AC-DC/The Razor\'s Edge/04 The Razor\'s Edge.mp3', 1),
(164, '05 Mistress For Christmas', '../Albumes/AC-DC/The Razor\'s Edge/05 Mistress For Christmas.mp3', 1),
(165, '06 Rock Your Heart Out', '../Albumes/AC-DC/The Razor\'s Edge/06 Rock Your Heart Out.mp3', 1),
(166, '07 Are You Ready', '../Albumes/AC-DC/The Razor\'s Edge/07 Are You Ready.mp3', 1),
(167, '08 Got You By The Balls', '../Albumes/AC-DC/The Razor\'s Edge/08 Got You By The Balls.mp3', 1),
(168, '09 Shot Of Love', '../Albumes/AC-DC/The Razor\'s Edge/09 Shot Of Love.mp3', 1),
(169, '10 Lets Make It', '../Albumes/AC-DC/The Razor\'s Edge/10 Lets Make It.mp3', 1),
(170, '11 Goodbye & Good Riddance To Bad Luck', '../Albumes/AC-DC/The Razor\'s Edge/11 Goodbye & Good Riddance To Bad Luck.mp3', 1),
(171, '12 If You Dare', '../Albumes/AC-DC/The Razor\'s Edge/12 If You Dare.mp3', 1),
(172, '01 Who Made Who', '../Albumes/AC-DC/Who Made Who/01 Who Made Who.mp3', 1),
(173, '02 You Shook Me All Night Long', '../Albumes/AC-DC/Who Made Who/02 You Shook Me All Night Long.mp3', 1),
(174, '03 D.T', '../Albumes/AC-DC/Who Made Who/03 D.T.mp3', 1),
(175, '04 Sink The Pink', '../Albumes/AC-DC/Who Made Who/04 Sink The Pink.mp3', 1),
(176, '05 Ride On', '../Albumes/AC-DC/Who Made Who/05 Ride On.mp3', 1),
(177, '06 Hells Bells', '../Albumes/AC-DC/Who Made Who/06 Hells Bells.mp3', 1),
(178, '07 Shake Your Foundations', '../Albumes/AC-DC/Who Made Who/07 Shake Your Foundations.mp3', 1),
(179, '08 Chase the Ace', '../Albumes/AC-DC/Who Made Who/08 Chase the Ace.mp3', 1),
(180, '09 For Those About To Rock (We Salute You)', '../Albumes/AC-DC/Who Made Who/09 For Those About To Rock (We Salute You).mp3', 1),
(181, '01 When Love Comes To Town', '../Albumes/B.B. King/Lucille & Friends/01 When Love Comes To Town.mp3', 3),
(182, '02 Playin\' With My Friends', '../Albumes/B.B. King/Lucille & Friends/02 Playin\' With My Friends.mp3', 3),
(183, '03 To Know You Is To Love You', '../Albumes/B.B. King/Lucille & Friends/03 To Know You Is To Love You.mp3', 3),
(184, '04 Caught A Touch Of Your Love', '../Albumes/B.B. King/Lucille & Friends/04 Caught A Touch Of Your Love.mp3', 3),
(185, '05 All You Ever Give Me Is The Blues', '../Albumes/B.B. King/Lucille & Friends/05 All You Ever Give Me Is The Blues.mp3', 3),
(186, '06 You Shook Me', '../Albumes/B.B. King/Lucille & Friends/06 You Shook Me.mp3', 3),
(187, '07 Spirit In The Dark', '../Albumes/B.B. King/Lucille & Friends/07 Spirit In The Dark.mp3', 3),
(188, '08 Can\'t Get Enough', '../Albumes/B.B. King/Lucille & Friends/08 Can\'t Get Enough.mp3', 3),
(189, '09 Since I Met You Baby', '../Albumes/B.B. King/Lucille & Friends/09 Since I Met You Baby.mp3', 3),
(190, '10 B.B.\'s Blues', '../Albumes/B.B. King/Lucille & Friends/10 B.B.\'s Blues.mp3', 3),
(191, '11 Better Not Look Down', '../Albumes/B.B. King/Lucille & Friends/11 Better Not Look Down.mp3', 3),
(192, '12 Frosty', '../Albumes/B.B. King/Lucille & Friends/12 Frosty.mp3', 3),
(193, '13 Hummingbird', '../Albumes/B.B. King/Lucille & Friends/13 Hummingbird.mp3', 3),
(194, '14 Ghetto Woman', '../Albumes/B.B. King/Lucille & Friends/14 Ghetto Woman.mp3', 3),
(195, '15 Let The Good Times Roll', '../Albumes/B.B. King/Lucille & Friends/15 Let The Good Times Roll.mp3', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones_albumes`
--

CREATE TABLE `canciones_albumes` (
  `cal_id` int(11) NOT NULL,
  `cal_idcancion` int(11) DEFAULT NULL,
  `cal_idalbum` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `canciones_albumes`
--

INSERT INTO `canciones_albumes` (`cal_id`, `cal_idcancion`, `cal_idalbum`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 2),
(7, 7, 2),
(8, 8, 2),
(9, 9, 2),
(10, 10, 2),
(11, 11, 2),
(12, 12, 2),
(13, 13, 2),
(14, 14, 2),
(15, 15, 2),
(16, 16, 2),
(17, 17, 2),
(18, 18, 2),
(19, 19, 2),
(20, 20, 3),
(21, 21, 3),
(22, 22, 3),
(23, 23, 3),
(24, 24, 3),
(25, 25, 3),
(26, 27, 3),
(27, 28, 3),
(28, 29, 3),
(29, 30, 4),
(30, 31, 4),
(31, 32, 4),
(32, 33, 4),
(33, 34, 4),
(34, 35, 4),
(35, 36, 4),
(36, 37, 4),
(37, 38, 4),
(38, 39, 4),
(39, 40, 4),
(40, 26, 3),
(41, 44, 5),
(42, 45, 5),
(43, 46, 5),
(44, 47, 5),
(45, 48, 5),
(46, 49, 5),
(47, 50, 5),
(48, 51, 5),
(49, 52, 5),
(50, 53, 5),
(51, 54, 6),
(52, 55, 6),
(53, 56, 6),
(54, 57, 6),
(55, 58, 6),
(56, 59, 6),
(57, 60, 6),
(58, 61, 6),
(59, 62, 6),
(60, 63, 7),
(61, 64, 7),
(62, 65, 7),
(63, 66, 7),
(64, 67, 7),
(65, 68, 7),
(66, 69, 7),
(67, 70, 7),
(68, 71, 7),
(69, 72, 7),
(70, 73, 8),
(71, 74, 8),
(72, 75, 8),
(73, 76, 8),
(74, 77, 8),
(75, 78, 8),
(76, 79, 8),
(77, 80, 8),
(78, 81, 8),
(79, 82, 8),
(80, 83, 9),
(81, 84, 9),
(82, 85, 9),
(83, 86, 9),
(84, 87, 9),
(85, 88, 9),
(86, 89, 9),
(87, 90, 9),
(88, 91, 9),
(89, 92, 9),
(90, 93, 10),
(91, 94, 10),
(92, 95, 10),
(93, 96, 10),
(94, 97, 10),
(95, 98, 10),
(96, 99, 10),
(97, 100, 10),
(98, 101, 10),
(99, 102, 11),
(100, 103, 11),
(101, 104, 11),
(102, 105, 11),
(103, 106, 11),
(104, 107, 11),
(105, 108, 11),
(106, 109, 11),
(107, 110, 11),
(108, 111, 11),
(109, 112, 12),
(110, 113, 12),
(111, 114, 12),
(112, 115, 12),
(113, 116, 12),
(114, 117, 12),
(115, 118, 12),
(116, 119, 12),
(117, 120, 12),
(118, 121, 12),
(119, 122, 13),
(120, 123, 13),
(121, 124, 13),
(122, 125, 13),
(123, 126, 13),
(124, 127, 13),
(125, 128, 13),
(126, 129, 13),
(127, 130, 14),
(128, 131, 14),
(129, 132, 14),
(130, 133, 14),
(131, 134, 14),
(132, 135, 14),
(133, 136, 14),
(134, 137, 14),
(135, 138, 14),
(136, 139, 15),
(137, 140, 15),
(138, 141, 15),
(139, 142, 15),
(140, 143, 15),
(141, 144, 15),
(142, 145, 15),
(143, 146, 15),
(144, 147, 15),
(145, 148, 15),
(146, 149, 15),
(147, 150, 15),
(148, 151, 16),
(149, 152, 16),
(150, 153, 16),
(151, 154, 16),
(152, 155, 16),
(153, 156, 16),
(154, 157, 16),
(155, 158, 16),
(156, 159, 16),
(157, 160, 17),
(158, 161, 17),
(159, 162, 17),
(160, 163, 17),
(161, 164, 17),
(162, 165, 17),
(163, 166, 17),
(164, 167, 17),
(165, 168, 17),
(166, 169, 17),
(167, 170, 17),
(168, 171, 17),
(169, 172, 18),
(170, 173, 18),
(171, 174, 18),
(172, 175, 18),
(173, 176, 18),
(174, 177, 18),
(175, 178, 18),
(176, 179, 18),
(177, 180, 18),
(178, 181, 19),
(179, 182, 19),
(180, 183, 19),
(181, 184, 19),
(182, 185, 19),
(183, 186, 19),
(184, 187, 19),
(185, 188, 19),
(186, 189, 19),
(187, 190, 19),
(188, 191, 19),
(189, 192, 19),
(190, 193, 19),
(191, 194, 19),
(192, 195, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones_artistas`
--

CREATE TABLE `canciones_artistas` (
  `car_id` int(11) NOT NULL,
  `car_idcancion` int(11) DEFAULT NULL,
  `car_idartista` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `canciones_artistas`
--

INSERT INTO `canciones_artistas` (`car_id`, `car_idcancion`, `car_idartista`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1),
(11, 11, 1),
(12, 12, 1),
(13, 13, 1),
(14, 14, 1),
(15, 15, 1),
(16, 16, 1),
(17, 17, 1),
(18, 18, 1),
(19, 19, 1),
(20, 20, 1),
(21, 21, 1),
(22, 22, 1),
(23, 23, 1),
(24, 24, 1),
(25, 25, 1),
(26, 26, 1),
(27, 27, 1),
(28, 28, 1),
(29, 29, 1),
(30, 30, 1),
(31, 31, 1),
(32, 32, 1),
(33, 33, 1),
(34, 34, 1),
(35, 35, 1),
(36, 36, 1),
(37, 37, 1),
(38, 38, 1),
(39, 39, 1),
(40, 40, 1),
(42, 44, 1),
(43, 45, 1),
(44, 46, 1),
(45, 47, 1),
(46, 48, 1),
(47, 49, 1),
(48, 50, 1),
(49, 51, 1),
(50, 52, 1),
(51, 53, 1),
(52, 54, 1),
(53, 55, 1),
(54, 56, 1),
(55, 57, 1),
(56, 58, 1),
(57, 59, 1),
(58, 60, 1),
(59, 61, 1),
(60, 62, 1),
(61, 63, 1),
(62, 64, 1),
(63, 65, 1),
(64, 66, 1),
(65, 67, 1),
(66, 68, 1),
(67, 69, 1),
(68, 70, 1),
(69, 71, 1),
(70, 72, 1),
(71, 73, 1),
(72, 74, 1),
(73, 75, 1),
(74, 76, 1),
(75, 77, 1),
(76, 78, 1),
(77, 79, 1),
(78, 80, 1),
(79, 81, 1),
(80, 82, 1),
(81, 83, 1),
(82, 84, 1),
(83, 85, 1),
(84, 86, 1),
(85, 87, 1),
(86, 88, 1),
(87, 89, 1),
(88, 90, 1),
(89, 91, 1),
(90, 92, 1),
(91, 93, 1),
(92, 94, 1),
(93, 95, 1),
(94, 96, 1),
(95, 97, 1),
(96, 98, 1),
(97, 99, 1),
(98, 100, 1),
(99, 101, 1),
(100, 102, 1),
(101, 103, 1),
(102, 104, 1),
(103, 105, 1),
(104, 106, 1),
(105, 107, 1),
(106, 108, 1),
(107, 109, 1),
(108, 110, 1),
(109, 111, 1),
(110, 112, 1),
(111, 113, 1),
(112, 114, 1),
(113, 115, 1),
(114, 116, 1),
(115, 117, 1),
(116, 118, 1),
(117, 119, 1),
(118, 120, 1),
(119, 121, 1),
(120, 122, 1),
(121, 123, 1),
(122, 124, 1),
(123, 125, 1),
(124, 126, 1),
(125, 127, 1),
(126, 128, 1),
(127, 129, 1),
(128, 130, 1),
(129, 131, 1),
(130, 132, 1),
(131, 133, 1),
(132, 134, 1),
(133, 135, 1),
(134, 136, 1),
(135, 137, 1),
(136, 138, 1),
(137, 139, 1),
(138, 140, 1),
(139, 141, 1),
(140, 142, 1),
(141, 143, 1),
(142, 144, 1),
(143, 145, 1),
(144, 146, 1),
(145, 147, 1),
(146, 148, 1),
(147, 149, 1),
(148, 150, 1),
(149, 151, 1),
(150, 152, 1),
(151, 153, 1),
(152, 154, 1),
(153, 155, 1),
(154, 156, 1),
(155, 157, 1),
(156, 158, 1),
(157, 159, 1),
(158, 160, 1),
(159, 161, 1),
(160, 162, 1),
(161, 163, 1),
(162, 164, 1),
(163, 165, 1),
(164, 166, 1),
(165, 167, 1),
(166, 168, 1),
(167, 169, 1),
(168, 170, 1),
(169, 171, 1),
(170, 172, 1),
(171, 173, 1),
(172, 174, 1),
(173, 175, 1),
(174, 176, 1),
(175, 177, 1),
(176, 178, 1),
(177, 179, 1),
(178, 180, 1),
(179, 181, 2),
(180, 182, 2),
(181, 183, 2),
(182, 184, 2),
(183, 185, 2),
(184, 186, 2),
(185, 187, 2),
(186, 188, 2),
(187, 189, 2),
(188, 190, 2),
(189, 191, 2),
(190, 192, 2),
(191, 193, 2),
(192, 194, 2),
(193, 195, 2);

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
  ADD PRIMARY KEY (`alb_id`);

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
  ADD KEY `can_idgenero` (`can_idgenero`);

--
-- Indices de la tabla `canciones_albumes`
--
ALTER TABLE `canciones_albumes`
  ADD PRIMARY KEY (`cal_id`),
  ADD KEY `cal_idcancion` (`cal_idcancion`),
  ADD KEY `cal_idalbum` (`cal_idalbum`);

--
-- Indices de la tabla `canciones_artistas`
--
ALTER TABLE `canciones_artistas`
  ADD PRIMARY KEY (`car_id`),
  ADD KEY `car_idcancion` (`car_idcancion`),
  ADD KEY `car_idartista` (`car_idartista`);

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
  MODIFY `can_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT de la tabla `canciones_albumes`
--
ALTER TABLE `canciones_albumes`
  MODIFY `cal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT de la tabla `canciones_artistas`
--
ALTER TABLE `canciones_artistas`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

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
-- Filtros para la tabla `canciones`
--
ALTER TABLE `canciones`
  ADD CONSTRAINT `canciones_ibfk_1` FOREIGN KEY (`can_idgenero`) REFERENCES `generos` (`gen_id`);

--
-- Filtros para la tabla `canciones_albumes`
--
ALTER TABLE `canciones_albumes`
  ADD CONSTRAINT `canciones_albumes_ibfk_1` FOREIGN KEY (`cal_idcancion`) REFERENCES `canciones` (`can_id`),
  ADD CONSTRAINT `canciones_albumes_ibfk_2` FOREIGN KEY (`cal_idalbum`) REFERENCES `albumes` (`alb_id`);

--
-- Filtros para la tabla `canciones_artistas`
--
ALTER TABLE `canciones_artistas`
  ADD CONSTRAINT `canciones_artistas_ibfk_1` FOREIGN KEY (`car_idcancion`) REFERENCES `canciones` (`can_id`),
  ADD CONSTRAINT `canciones_artistas_ibfk_2` FOREIGN KEY (`car_idartista`) REFERENCES `artistas` (`art_id`);

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
