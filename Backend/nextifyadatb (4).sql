-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 17. 11:54
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `nextifyadatb`
--
CREATE DATABASE IF NOT EXISTS `nextifyadatb` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `nextifyadatb`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `blog`
--

CREATE TABLE `blog` (
  `blog_id` int(11) NOT NULL,
  `blog_cim` varchar(255) NOT NULL,
  `blog_szoveg` text NOT NULL,
  `blog_datum` date NOT NULL,
  `blog_kep` varchar(255) NOT NULL,
  `blog_fajta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `blog`
--

INSERT INTO `blog` (`blog_id`, `blog_cim`, `blog_szoveg`, `blog_datum`, `blog_kep`, `blog_fajta`) VALUES
(1, 'Iphone új', 'Megjelent az Iphone 17', '2025-12-10', 'iphone17.jpg', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fajta`
--

CREATE TABLE `fajta` (
  `fajta_id` int(11) NOT NULL,
  `fajta_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `fajta`
--

INSERT INTO `fajta` (`fajta_id`, `fajta_nev`) VALUES
(1, 'Akció'),
(2, 'Megjelenés'),
(3, 'Hír');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `felhasznalo_id` int(11) NOT NULL,
  `felhasznalo_nev` varchar(255) NOT NULL,
  `felhasznalo_jelszo` varchar(255) NOT NULL,
  `felhasznalo_rang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`felhasznalo_id`, `felhasznalo_nev`, `felhasznalo_jelszo`, `felhasznalo_rang`) VALUES
(5, 'Aa', '$2a$10$auhieAYn7dvRvnziq7bFHuNTcBVx/LMBUofF/wsbkz6rfTn95x6mO', 1),
(6, 'Admin', '$2a$10$FNoGv4HB.4kVETfdb2QvbegXOqNv2BNpXWCDwFKla.www/Qz0wMB.', 2),
(8, 'User', '$2b$10$6/h08PIcMvWwlzV66dNsaeMD5Vc/jq0q2N4p1IsvO5YrvZdP9VyxK', 1),
(9, 'Proba', '$2b$10$eAcFZ8OKIz8KgAzEGhsJxeZyLcNb4Lfe2bfgfTmygINASTzN9jCxq', 1),
(10, 'gg', '$2b$10$.AmZdgjyIr7QbCVvfLkTwO/Kd.FQ7DP4AZAjb4wgpt/8lorEXEd4.', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `marka`
--

CREATE TABLE `marka` (
  `marka_id` int(11) NOT NULL,
  `marka_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `marka`
--

INSERT INTO `marka` (`marka_id`, `marka_nev`) VALUES
(1, 'Samsung'),
(2, 'Iphone'),
(3, 'Nokia'),
(4, 'LG'),
(5, 'Sony'),
(6, 'Xiaomi'),
(7, 'Huawei'),
(8, 'Lenovo');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rang`
--

CREATE TABLE `rang` (
  `rang_id` int(11) NOT NULL,
  `rang_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `rang`
--

INSERT INTO `rang` (`rang_id`, `rang_nev`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termek`
--

CREATE TABLE `termek` (
  `termek_id` int(11) NOT NULL,
  `termek_nev` varchar(255) NOT NULL,
  `termek_ar` int(11) NOT NULL,
  `termek_szin` varchar(255) NOT NULL,
  `termek_kijelzo` varchar(255) NOT NULL,
  `termek_processzor` varchar(255) NOT NULL,
  `termek_kapacitas` varchar(255) NOT NULL,
  `termek_oprendszer` varchar(255) NOT NULL,
  `termek_meret` varchar(255) NOT NULL,
  `termek_leiras` text NOT NULL,
  `termek_kep` varchar(100) NOT NULL,
  `termek_marka` int(11) NOT NULL,
  `termek_tipus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `termek`
--

INSERT INTO `termek` (`termek_id`, `termek_nev`, `termek_ar`, `termek_szin`, `termek_kijelzo`, `termek_processzor`, `termek_kapacitas`, `termek_oprendszer`, `termek_meret`, `termek_leiras`, `termek_kep`, `termek_marka`, `termek_tipus`) VALUES
(1, 'Samsung Galaxy S25 FE 5G 256GB 8GB RAM Dual (SM-S731B) Mobiltelefon', 199990, 'fekete', 'legfeljebb 120 Hz-es\r\n2340 x 1080 pixel', 'SoC/CPU: Samsung Exynos 2400\r\nGPU: Xclipse 940', 'Tárhely mérete: 256 GB\r\nRAM mérete: 8 GB', 'Android', 'Hosszúság: 161.3 mm\r\nSzélesség: 76.6 mm\r\nVastagság: 7.4 mm\r\nTömeg: 190 g', 'Vékonyabb kivitel, nagyobb élvezet! 7,4 mm vastagságával és 190 g tömegével az eddigi legvékonyabb és legkönnyebb FE telefon. Az eddigi legvékonyabb kerettel is rendelkezik, ami a letisztult kamera dizájnnal párosulva elegáns megjelenést és még magával ragadóbb élményt nyújt.', '1.png', 1, 1),
(2, 'Apple iPhone 17 256GB Mobiltelefon', 389900, 'zöld', 'legfeljebb 120 Hz-es\r\n2622 x 1206 pixel', 'SoC/CPU: Apple A19', 'Tárhely mérete: 256 GB\r\nRAM mérete: 8 GB', 'iOS', 'Hosszúság: 149.6 mm\r\nSzélesség: 71.5 mm\r\nVastagság: 8 mm\r\nTömeg: 177 g', 'Megérkezett az új iPhone 17. Ívelt élekkel, keskenyebb peremekkel és olyan ellenálló anyagokkal alkottuk meg, mint az előlapon használt Ceramic Shield 2 – így hosszú időn át megőrzi szépségét. A 6,3 hüvelykes Super Retina XDR-kijelzőn4 többet láthatsz, és többet foglalkozhatsz azzal, amit szeretsz.', '2.png', 2, 1),
(3, 'Samsung Gyári USB-C 25W Telefon és Tablet Adapter Töltő + 1m USB-C töltőkábel (EP-TA800EWE + EP-DG977BWE)', 6999, 'fehér', '', '', '', '', 'USB-C kábel 1m', '-Samsung Galaxy telefonok és tabletek (Tab) töltéséhez\r\n-Samsung USB-C telefon vagy tablet töltő\r\n- Teljesítmény: 25W', '3.png', 1, 6),
(4, 'Samsung EHS64AVFWE Vezetékes Fülhallgató Mini Jack 3.5mm Sztereó Hi-Fi (Bulk - Cserélhető Csomagolás) - Fehér ', 3700, 'fehér', '', '', '', '', '1,2 m', 'Samsung EHS64AVFWE Vezetékes Fülhallgató Mini Jack 3.5mm Sztereó Hi-Fi (Bulk - Cserélhető Csomagolás) - Fehér Fedezd fel a különleges Samsung EHS64AVFWE fülhallgatókat, amelyek ötvözik a stílust a funkcionalitással. A hangerőszabályzóval és a beépített mikrofonnal tökéletesek mind telefonhívások lebonyolítására, mind kedvenc zenéid hallgatására. A 3.5 mm-es csatlakozó maximális kompatibilitást biztosít sokféle eszközzel, így rendkívül sokoldalúak. Ezek az elegáns, fehér fülhallgatók garantálják a legmagasabb hangminőséget, ami kiemeli Hi-Fi osztályukat. A termék cserélhető csomagolásban kerül forgalomba - egy húzós gyöngyvászon táska. ', '4.png', 1, 4),
(5, 'Samsung P4520 20000 mAh (EB-P4520XUEGEU)', 17900, 'fehér', '', '', '', '', 'Hosszúság: 152 mm\r\nSzélesség: 76 mm\r\nVastagság: 25.5 mm\r\nTömeg: 402 g', 'Szupergyors töltés menet közben\r\n\r\nA 45 W-os, nagy kapacitású, 20 000 mAh-s powerbank szupergyors 2.0 töltéssel lehetővé teszi a kompatibilis harmadik féltől származó és Samsung készülékek gyors újratöltését, beleértve magát az akkumulátort is, amikor az alacsony. Power Delivery 3.0-val és USB-C-vel felszerelve, hogy útközben is tölthesse eszközeit.\r\n\r\nTöltsön fel 3 eszközt egyszerre\r\n\r\nA Triple Port lehetővé teszi három eszköz egyidejű töltését a nagyobb kényelem és a nagyobb teljesítmény érdekében, amikor a legnagyobb szüksége van rá.\r\n\r\nZöld energia, újradefiniálva.\r\n\r\nA powerbankot átgondoltan tervezték, a környezetet szem előtt tartva, UL-tanúsítvánnyal rendelkező újrahasznosított anyagok felhasználásával a szén-dioxid-kibocsátás csökkentése és az értékes erőforrások megőrzése érdekében, miközben új életet ad a fogyasztói hulladéknak.\r\n', '5.png', 1, 7),
(6, 'Nokia 110 4G (2023) Dual Mobiltelefon', 14490, 'fekete', '60 Hz\r\n120 x 160 pixel', '', 'RAM: 48 MB\r\nMemória: Belső memóriája 128 MB, amely bővíthető MicroSD kártyával.', '', 'Hosszúság: 121.5 mm\r\nSzélesség: 50 mm\r\nVastagság: 14.4 mm\r\nTömeg: 95 g', 'A Nokia 110 4G (2023) Dual SIM mobiltelefon egy klasszikus Nokia dizájnnal rendelkező, modern eszköz, amely kiválóan megfelel a mindennapi használati igényeknek. Ez az okostelefon két SIM kártyát támogat, és 4G hálózaton működik, így biztosítva a két szolgáltató használatát egyszerre.', '6.png', 3, 2),
(7, 'Samsung Galaxy Tab S10 Lite X400 128GB SM-X400NZAR', 112900, 'Sötétszürke', '90 Hz\r\n2112 x 1320', 'Samsung Exynos 1380 8 magos', 'RAM mérete: 6 GB\r\nTárhely mérete: 128 GB', 'Android', 'Szélesség: 165.8 mm\r\nMagasság: 254.3 mm\r\nVastagság: 6.6 mm\r\nTömeg: 524 g', 'A SAMSUNG Tablet Galaxy Tab S10 Lite egy letisztult és praktikus megoldás, amely ideális mindennapi használatra, beleértve a multimédiás tartalmak megtekintését, az internetböngészést és a produktív feladatok ellátását. A tablet egy 10,9 colos kijelzővel rendelkezik, amely biztosítja az élénk és tiszta képet, míg a Wi-Fi kapcsolat lehetővé teszi az online tevékenységek végzését otthon vagy munkahelyen.', '7.png', 1, 3),
(8, 'Samsung Galaxy A72 / A72 5G Telefontok - kék mágneses szilikon keretes könyvtok', 2980, 'kék', '', '', '', '', '', 'Kihajtható tok pénz- és bankkártyatartóval, oldalra kitámasztható, divatos színben. Teljes körű védelmet nyújt a telefon elő- és hátlapjának. A telefonkészüléket a tok belsejében kialakított szilikonperemben helyezzük el, így a telefon stabilan illeszkedik a tokhoz. Az erős mágneses zárás biztosítja a tok megbízható összezáródását. A tok speciálisan a telefonodhoz tervezve, minden gomb, csatlakozó tökéletesen illeszkedik a készülékedhez.', '8.png', 1, 5),
(9, 'Okostelefon LG K42 3 GB / 64 GB 4G (LTE) szürke ÚJ', 54250, 'szürke', '1600 x 720 ', 'MediaTek MT6762', 'Beépített memória\r\n64 GB\r\nRAM memória\r\n3 GB', 'Android', 'Szélesség: 76.7 mm\r\nMagasság: 165 mm\r\nMélység: 8.4 mm\r\nSúly: 182 g', 'Kijelző, amely lenyűgöző\r\nA nagy képernyő nagy lett. Nézd a legújabb sorozatokat, a kedvenc videobloggereid felvételeit, és játssz kényelmesen az extra nagy, 6,6”-os HD+ képernyőn. A kijelzőn található kis nyílás lehetővé teszi a helytakarékosságot, így még magával ragadóbb játékélményt nyújt.\r\n\r\nHallgasd úgy, ahogy szeretnéd\r\nNyűgözd le belső audiofiledet! A Sound Engine LG 3D hangprocesszor 17 millió hangmintát hallgatott meg, hogy mindig optimális minőségű hangzást biztosítson. Minden zenei műfaj, játék, podcast és film minden helyzetben fenomenálisan szól.', '9.png', 4, 1),
(10, 'SONY XPERIA 10 V 128GB 5G XQ-DC54 DS OLED SD kártya slot Green', 104010, 'zöld', '2520 x 1080 px', 'Qualcomm Snapdragon 695', 'Beépített memória: 128 GB\r\nRAM memória: 6 GB', 'Android', 'Szélesség: 68 mm\r\nMagasság: 155 mm\r\nMélység: 8.3 mm\r\nSúly: 159 g', 'SONY XPERIA 10 V XQ-DC54 DS NANO SIM/eSIM 128GB Green\r\nAz Xperia 10 V Qualcomm Snapdragon 695 5G processzorral és 6 GB RAM-mal rendelkezik. Ezzel a kombinációval sokféleképpen használhatja - anélkül, hogy aggódnia kellene az elakadás miatt. Játssz, használj alkalmazásokat, nézz videókat vagy streamelj videókat. A gyorsan letöltött anyagokat egy 128 GB-os beépített memóriában is tárolhatja.\r\n\r\nKönnyű ház, nagy teljesítményű akkumulátor\r\nAz Xperia 10 V egy rendkívül könnyű és funkcionális okostelefon - súlya mindössze 159 g. Ráadásul 5000 mAh kapacitású akkumulátorral rendelkezik, így a mindennapi használat zenehallgatás, játék vagy fényképezőgép használata közben nem okoz energiahiányt. A videókhoz akár 34 órán keresztül is hozzáférhetsz!', '10.png', 5, 1),
(11, 'Xiaomi Redmi 15 8/256GB Okostelefon, lila', 69990, 'lila', '2340x1080', 'Qualcomm® Snapdragon™ 685', 'Memóriaméret RAM: 8GB\r\nHáttértár: 256 GB', 'HyperOS', '', 'A készülék nagy kapacitású, 7000 mAh-s akkumulátorával hosszú üzemidőt biztosít, így egész napos használatra is alkalmas. A 6,9”-es FHD+ kijelző éles és élénk képmegjelenítést nyújt, a Snapdragon® 685 processzor pedig gördülékeny, gyors működést garantál. A 50 MP-es AI dupla kamera kiváló fotókat készít különböző körülmények között, a 33W-os gyorstöltés pedig gyorsan feltölti az eszközt. A készülék stílusos megjelenésű, és IP64 védelemnek köszönhetően víz- és porálló, így tartós és megbízható mindennapi használatra.', '11.png', 6, 1),
(12, 'HUAWEI nova 12i 8GB/128GB Black', 104990, 'fekete', ' 2388 × 1080', 'Qualcomm Snapdragon 680', 'Rendszermemória: (RAM) 8 GB\r\nBelső memória: 128 GB', ' Android', 'Magasság: 16,33 cm\r\nSzélesség: 7,47 cm\r\nMélység: 0,84 cm\r\nSúly: 199 g', 'Mobiltelefon - 6,7\"-es IPS kijelző 2388 × 1080 felbontással (90Hz), 8 GB RAM, 128 GB belső tárhely, dual SIM, Qualcomm Snapdragon 680 processzor, kameramodul: 108Mpx (f/1,9) fő kamera, 8Mpx felbontású előlapi kamera, ujjlenyomat-olvasó, GPS, NFC, LTE, USB-C csatlakozó, gyorstöltés 40W, 5000 mAh kapacitású akkumulátor, megjelenés éve 2024', '12.png', 7, 1),
(13, 'Lenovo Idea Tab TB336FU 8GB+256GB Luna Grey + Pencil + Case', 101790, 'szürke', 'QHD 2560 × 1600', 'Mediatek Dimensity 6300', 'RAM mérete: 8 GB (8 192 MB)\r\nTárhely kapacitás: 256 GB', ' Google Android', 'Magasság: 254,59 mm (25,46 cm)\r\nSzélesség: 166,15 mm (16,62 cm)\r\nMélység: 6,99 mm (0,7 cm)\r\nTömeg: 480 g (0,48 kg)', 'Tablet - 11\" QHD 2560 × 1600 IPS kijelző, Mediatek Dimensity 6300 2 GHz, 8 GB RAM, 256 GB tárhely, memóriakártya max. mérete 256 GB, WiFi, Bluetooth, GPS, 8 Mpx fő (hátsó) kamera, 5 Mpx szelfi kamera, USB-C, 20W gyors töltés, 7040 mAh akkumulátor kapacitás, Android 15', '13.png', 8, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tipus`
--

CREATE TABLE `tipus` (
  `tipus_id` int(11) NOT NULL,
  `tipus_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tipus`
--

INSERT INTO `tipus` (`tipus_id`, `tipus_nev`) VALUES
(1, 'Okostelefon'),
(2, 'Gombos telefon'),
(3, 'Tablet'),
(4, 'Fülhallgató'),
(5, 'Telefontok'),
(6, 'Töltő'),
(7, 'Powerbank');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `velemeny`
--

CREATE TABLE `velemeny` (
  `velemeny_id` int(11) NOT NULL,
  `velemeny_felhasz_id` int(11) NOT NULL,
  `velemeny_termek_id` int(11) NOT NULL,
  `velemeny_ertekeles` int(11) NOT NULL,
  `velemeny_szoveg` text NOT NULL,
  `velemeny_datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `velemeny`
--

INSERT INTO `velemeny` (`velemeny_id`, `velemeny_felhasz_id`, `velemeny_termek_id`, `velemeny_ertekeles`, `velemeny_szoveg`, `velemeny_datum`) VALUES
(3, 8, 2, 4, 'Jó a termék!', '2025-12-16 11:47:23');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blog_id`),
  ADD UNIQUE KEY `blog_fajta` (`blog_fajta`);

--
-- A tábla indexei `fajta`
--
ALTER TABLE `fajta`
  ADD PRIMARY KEY (`fajta_id`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`felhasznalo_id`),
  ADD KEY `felhasznalo_rang` (`felhasznalo_rang`);

--
-- A tábla indexei `marka`
--
ALTER TABLE `marka`
  ADD PRIMARY KEY (`marka_id`);

--
-- A tábla indexei `rang`
--
ALTER TABLE `rang`
  ADD PRIMARY KEY (`rang_id`);

--
-- A tábla indexei `termek`
--
ALTER TABLE `termek`
  ADD PRIMARY KEY (`termek_id`),
  ADD KEY `termek_tipus` (`termek_tipus`),
  ADD KEY `termek_marka` (`termek_marka`);

--
-- A tábla indexei `tipus`
--
ALTER TABLE `tipus`
  ADD PRIMARY KEY (`tipus_id`);

--
-- A tábla indexei `velemeny`
--
ALTER TABLE `velemeny`
  ADD PRIMARY KEY (`velemeny_id`),
  ADD KEY `velemeny_felhasz_id` (`velemeny_felhasz_id`,`velemeny_termek_id`),
  ADD KEY `velemeny_termek_id` (`velemeny_termek_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `fajta`
--
ALTER TABLE `fajta`
  MODIFY `fajta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `marka`
--
ALTER TABLE `marka`
  MODIFY `marka_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `rang`
--
ALTER TABLE `rang`
  MODIFY `rang_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `termek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `tipus`
--
ALTER TABLE `tipus`
  MODIFY `tipus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `velemeny`
--
ALTER TABLE `velemeny`
  MODIFY `velemeny_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`blog_fajta`) REFERENCES `fajta` (`fajta_id`);

--
-- Megkötések a táblához `rang`
--
ALTER TABLE `rang`
  ADD CONSTRAINT `rang_ibfk_1` FOREIGN KEY (`rang_id`) REFERENCES `felhasznalo` (`felhasznalo_rang`);

--
-- Megkötések a táblához `termek`
--
ALTER TABLE `termek`
  ADD CONSTRAINT `termek_ibfk_1` FOREIGN KEY (`termek_tipus`) REFERENCES `tipus` (`tipus_id`),
  ADD CONSTRAINT `termek_ibfk_2` FOREIGN KEY (`termek_marka`) REFERENCES `marka` (`marka_id`);

--
-- Megkötések a táblához `velemeny`
--
ALTER TABLE `velemeny`
  ADD CONSTRAINT `velemeny_ibfk_2` FOREIGN KEY (`velemeny_termek_id`) REFERENCES `termek` (`termek_id`),
  ADD CONSTRAINT `velemeny_ibfk_3` FOREIGN KEY (`velemeny_felhasz_id`) REFERENCES `felhasznalo` (`felhasznalo_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
