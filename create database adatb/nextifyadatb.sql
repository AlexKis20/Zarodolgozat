-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 24. 20:08
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
-- Tábla szerkezet ehhez a táblához `akcio`
--

CREATE TABLE `akcio` (
  `akcio_id` int(11) NOT NULL,
  `akcio_nev` text NOT NULL,
  `akcio_kedvezmeny` double NOT NULL,
  `akcio_tipus` text NOT NULL,
  `akcio_kezdete` datetime NOT NULL,
  `akcio_vege` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `akcio`
--

INSERT INTO `akcio` (`akcio_id`, `akcio_nev`, `akcio_kedvezmeny`, `akcio_tipus`, `akcio_kezdete`, `akcio_vege`) VALUES
(4, 'Tavaszváró akció Samsung okostelefonra!', 20, 'szazalek', '2026-02-02 23:00:00', '2026-02-28 22:59:59'),
(6, 'Lenovo tablet akció', 30, 'szazalek', '2026-05-15 21:59:59', '2026-05-23 21:59:59');

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
(1, 'Megnyílt az új üzletünk!', 'Megnyílt Debrecen belvárosában az új épületünk.', '2026-01-21', '18.jpg', 2),
(2, 'Nálunk is elérhető az Iphone 17!', 'Szerezd be nálunk az okostelefonodat jó áron!', '2026-02-02', 'iphone17.jpg', 3),
(3, 'Tavaszváró akció Samsung okostelefonra!', '20% kedvezmény minden Samsung okostelefonra! Más kedvezménnyel nem összevonható. A készlet erejéig érvényes.', '2026-02-03', '19.jpg', 1),
(4, 'USB-C', '2024-től szinte minden elektronikai eszköz — okostelefonok, tabletek, kamerák és fülhallgatók — már USB-C töltőcsatlakozóval érkezik! Szerezd be nálunk az új készülékeket!', '2026-03-11', 'usbc.jpg', 3),
(5, 'Tudtad?', '2026 tavaszától hatályba lép, hogy a laptopoknak is USB-C töltő kábel kell. Szerezd be nálunk!', '2026-04-08', 'usbc2.jpg', 3),
(7, 'Új tablet a kínálatunkban!', 'A Lenovo 12,7\" Idea Tab Pro Tablet USB-C töltéssel!', '2026-05-01', '21.webp', 2),
(8, 'Lenovo tablet akció!', '30% kedvezmény minden Lenovo tabletre. Más kedvezménnyel nem összevonható. A készlet erejéig érvényes.', '2026-05-15', '20.png', 1);

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
(3, 'Blog');

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
(10, 'NagyKatalin', '$2b$10$.AmZdgjyIr7QbCVvfLkTwO/Kd.FQ7DP4AZAjb4wgpt/8lorEXEd4.', 0),
(11, 'Alex', '$2b$10$4mkbT7f7tv7OSWJz5G3UduumDBDHsKp88J3nPcRf.G5.d1WhcJCWW', 1);

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
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `rendeles_id` int(11) NOT NULL,
  `rendeles_felhasznalo_id` int(11) NOT NULL,
  `rendeles_nev` varchar(255) NOT NULL,
  `rendeles_cim` text NOT NULL,
  `rendeles_telefonszam` text NOT NULL,
  `rendeles_datum` datetime NOT NULL,
  `rendeles_teljesitve` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles`
--

INSERT INTO `rendeles` (`rendeles_id`, `rendeles_felhasznalo_id`, `rendeles_nev`, `rendeles_cim`, `rendeles_telefonszam`, `rendeles_datum`, `rendeles_teljesitve`) VALUES
(19, 10, 'Nagy Katalin', '4025 Debrecen, Széchenyi u. 6', '06301273723', '2026-04-15 00:00:00', 1),
(20, 8, 'Gergő', '4150 Püspökladány Damjanich utca 1', '06202384774', '2026-05-10 12:12:13', 0),
(21, 11, 'Alex', '4251 Hajdúsámson, Hadházi út 8', '06302212356', '2026-02-06 05:00:00', 1),
(22, 11, 'Dani', '4030 Debrecen, Budai Ézsaiás u. 8/A', '06309561023', '2026-01-28 00:00:00', 1),
(23, 11, 'Kiss Béla', '4030 Debrecen, Budai Ézsaiás u. 8/A', 'Nincs', '2026-03-18 11:26:00', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles_termek`
--

CREATE TABLE `rendeles_termek` (
  `rendeles_id` int(11) NOT NULL,
  `rendeles_termek_id` int(11) NOT NULL,
  `rendeles_ar` int(11) NOT NULL,
  `rendeles_darab` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles_termek`
--

INSERT INTO `rendeles_termek` (`rendeles_id`, `rendeles_termek_id`, `rendeles_ar`, `rendeles_darab`) VALUES
(19, 2, 389900, 1),
(20, 5, 17900, 1),
(20, 44, 399990, 1),
(21, 1, 199990, 1),
(22, 44, 399990, 1),
(23, 1, 199990, 1);

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
  `termek_tipus` int(11) NOT NULL,
  `termek_akcio_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `termek`
--

INSERT INTO `termek` (`termek_id`, `termek_nev`, `termek_ar`, `termek_szin`, `termek_kijelzo`, `termek_processzor`, `termek_kapacitas`, `termek_oprendszer`, `termek_meret`, `termek_leiras`, `termek_kep`, `termek_marka`, `termek_tipus`, `termek_akcio_id`) VALUES
(1, 'Samsung Galaxy S25 FE 5G 256GB 8GB RAM Dual (SM-S731B) Mobiltelefon', 199990, 'fekete', 'legfeljebb 120 Hz-es\r\n2340 x 1080 pixel', 'SoC/CPU: Samsung Exynos 2400\r\nGPU: Xclipse 940', 'Tárhely mérete: 256 GB\r\nRAM mérete: 8 GB', 'Android', 'Hosszúság: 161.3 mm\r\nSzélesség: 76.6 mm\r\nVastagság: 7.4 mm\r\nTömeg: 190 g', 'Vékonyabb kivitel, nagyobb élvezet! 7,4 mm vastagságával és 190 g tömegével az eddigi legvékonyabb és legkönnyebb FE telefon. Az eddigi legvékonyabb kerettel is rendelkezik, ami a letisztult kamera dizájnnal párosulva elegáns megjelenést és még magával ragadóbb élményt nyújt.', '1.png', 1, 1, 7),
(2, 'Apple iPhone 17 256GB Mobiltelefon', 389900, 'zöld', 'legfeljebb 120 Hz-es\r\n2622 x 1206 pixel', 'SoC/CPU: Apple A19', 'Tárhely mérete: 256 GB\r\nRAM mérete: 8 GB', 'iOS', 'Hosszúság: 149.6 mm\r\nSzélesség: 71.5 mm\r\nVastagság: 8 mm\r\nTömeg: 177 g', 'Megérkezett az új iPhone 17. Ívelt élekkel, keskenyebb peremekkel és olyan ellenálló anyagokkal alkottuk meg, mint az előlapon használt Ceramic Shield 2 – így hosszú időn át megőrzi szépségét. A 6,3 hüvelykes Super Retina XDR-kijelzőn4 többet láthatsz, és többet foglalkozhatsz azzal, amit szeretsz.', '2.png', 2, 1, 0),
(3, 'Samsung Gyári USB-C 25W Telefon és Tablet Adapter Töltő + 1m USB-C töltőkábel (EP-TA800EWE + EP-DG977BWE)', 6999, 'fehér', '', '', '', '', 'USB-C kábel 1m', '-Samsung Galaxy telefonok és tabletek (Tab) töltéséhez\r\n-Samsung USB-C telefon vagy tablet töltő\r\n- Teljesítmény: 25W', '3.png', 1, 6, 0),
(4, 'Samsung EHS64AVFWE Vezetékes Fülhallgató Mini Jack 3.5mm Sztereó Hi-Fi (Bulk - Cserélhető Csomagolás) - Fehér ', 3700, 'fehér', '', '', '', '', '1,2 m', 'Samsung EHS64AVFWE Vezetékes Fülhallgató Mini Jack 3.5mm Sztereó Hi-Fi (Bulk - Cserélhető Csomagolás) - Fehér Fedezd fel a különleges Samsung EHS64AVFWE fülhallgatókat, amelyek ötvözik a stílust a funkcionalitással. A hangerőszabályzóval és a beépített mikrofonnal tökéletesek mind telefonhívások lebonyolítására, mind kedvenc zenéid hallgatására. A 3.5 mm-es csatlakozó maximális kompatibilitást biztosít sokféle eszközzel, így rendkívül sokoldalúak. Ezek az elegáns, fehér fülhallgatók garantálják a legmagasabb hangminőséget, ami kiemeli Hi-Fi osztályukat. A termék cserélhető csomagolásban kerül forgalomba - egy húzós gyöngyvászon táska. ', '4.png', 1, 4, 0),
(5, 'Samsung P4520 20000 mAh (EB-P4520XUEGEU)', 17900, 'fehér', '', '', '', '', 'Hosszúság: 152 mm\r\nSzélesség: 76 mm\r\nVastagság: 25.5 mm\r\nTömeg: 402 g', 'Szupergyors töltés menet közben\r\n\r\nA 45 W-os, nagy kapacitású, 20 000 mAh-s powerbank szupergyors 2.0 töltéssel lehetővé teszi a kompatibilis harmadik féltől származó és Samsung készülékek gyors újratöltését, beleértve magát az akkumulátort is, amikor az alacsony. Power Delivery 3.0-val és USB-C-vel felszerelve, hogy útközben is tölthesse eszközeit.\r\n\r\nTöltsön fel 3 eszközt egyszerre\r\n\r\nA Triple Port lehetővé teszi három eszköz egyidejű töltését a nagyobb kényelem és a nagyobb teljesítmény érdekében, amikor a legnagyobb szüksége van rá.\r\n\r\nZöld energia, újradefiniálva.\r\n\r\nA powerbankot átgondoltan tervezték, a környezetet szem előtt tartva, UL-tanúsítvánnyal rendelkező újrahasznosított anyagok felhasználásával a szén-dioxid-kibocsátás csökkentése és az értékes erőforrások megőrzése érdekében, miközben új életet ad a fogyasztói hulladéknak.\r\n', '5.png', 1, 7, 0),
(6, 'Nokia 110 4G (2023) Dual Mobiltelefon', 14490, 'fekete', '60 Hz\r\n120 x 160 pixel', '', 'RAM: 48 MB\r\nMemória: Belső memóriája 128 MB, amely bővíthető MicroSD kártyával.', '', 'Hosszúság: 121.5 mm\r\nSzélesség: 50 mm\r\nVastagság: 14.4 mm\r\nTömeg: 95 g', 'A Nokia 110 4G (2023) Dual SIM mobiltelefon egy klasszikus Nokia dizájnnal rendelkező, modern eszköz, amely kiválóan megfelel a mindennapi használati igényeknek. Ez az okostelefon két SIM kártyát támogat, és 4G hálózaton működik, így biztosítva a két szolgáltató használatát egyszerre.', '6.png', 3, 2, 0),
(7, 'Samsung Galaxy Tab S10 Lite X400 128GB SM-X400NZAR', 112900, 'Sötétszürke', '90 Hz\r\n2112 x 1320', 'Samsung Exynos 1380 8 magos', 'RAM mérete: 6 GB\r\nTárhely mérete: 128 GB', 'Android', 'Szélesség: 165.8 mm\r\nMagasság: 254.3 mm\r\nVastagság: 6.6 mm\r\nTömeg: 524 g', 'A SAMSUNG Tablet Galaxy Tab S10 Lite egy letisztult és praktikus megoldás, amely ideális mindennapi használatra, beleértve a multimédiás tartalmak megtekintését, az internetböngészést és a produktív feladatok ellátását. A tablet egy 10,9 colos kijelzővel rendelkezik, amely biztosítja az élénk és tiszta képet, míg a Wi-Fi kapcsolat lehetővé teszi az online tevékenységek végzését otthon vagy munkahelyen.', '7.png', 1, 3, 0),
(8, 'Samsung Galaxy A72 / A72 5G Telefontok - kék mágneses szilikon keretes könyvtok', 2980, 'kék', '', '', '', '', '', 'Kihajtható tok pénz- és bankkártyatartóval, oldalra kitámasztható, divatos színben. Teljes körű védelmet nyújt a telefon elő- és hátlapjának. A telefonkészüléket a tok belsejében kialakított szilikonperemben helyezzük el, így a telefon stabilan illeszkedik a tokhoz. Az erős mágneses zárás biztosítja a tok megbízható összezáródását. A tok speciálisan a telefonodhoz tervezve, minden gomb, csatlakozó tökéletesen illeszkedik a készülékedhez.', '8.png', 1, 5, 0),
(9, 'Okostelefon LG K42 3 GB / 64 GB 4G (LTE) szürke ÚJ', 54250, 'szürke', '1600 x 720 ', 'MediaTek MT6762', 'Beépített memória\r\n64 GB\r\nRAM memória\r\n3 GB', 'Android', 'Szélesség: 76.7 mm\r\nMagasság: 165 mm\r\nMélység: 8.4 mm\r\nSúly: 182 g', 'Kijelző, amely lenyűgöző\r\nA nagy képernyő nagy lett. Nézd a legújabb sorozatokat, a kedvenc videobloggereid felvételeit, és játssz kényelmesen az extra nagy, 6,6”-os HD+ képernyőn. A kijelzőn található kis nyílás lehetővé teszi a helytakarékosságot, így még magával ragadóbb játékélményt nyújt.\r\n\r\nHallgasd úgy, ahogy szeretnéd\r\nNyűgözd le belső audiofiledet! A Sound Engine LG 3D hangprocesszor 17 millió hangmintát hallgatott meg, hogy mindig optimális minőségű hangzást biztosítson. Minden zenei műfaj, játék, podcast és film minden helyzetben fenomenálisan szól.', '9.png', 4, 1, 0),
(10, 'SONY XPERIA 10 V 128GB 5G XQ-DC54 DS OLED SD kártya slot Green', 104010, 'zöld', '2520 x 1080 px', 'Qualcomm Snapdragon 695', 'Beépített memória: 128 GB\r\nRAM memória: 6 GB', 'Android', 'Szélesség: 68 mm\r\nMagasság: 155 mm\r\nMélység: 8.3 mm\r\nSúly: 159 g', 'SONY XPERIA 10 V XQ-DC54 DS NANO SIM/eSIM 128GB Green\r\nAz Xperia 10 V Qualcomm Snapdragon 695 5G processzorral és 6 GB RAM-mal rendelkezik. Ezzel a kombinációval sokféleképpen használhatja - anélkül, hogy aggódnia kellene az elakadás miatt. Játssz, használj alkalmazásokat, nézz videókat vagy streamelj videókat. A gyorsan letöltött anyagokat egy 128 GB-os beépített memóriában is tárolhatja.\r\n\r\nKönnyű ház, nagy teljesítményű akkumulátor\r\nAz Xperia 10 V egy rendkívül könnyű és funkcionális okostelefon - súlya mindössze 159 g. Ráadásul 5000 mAh kapacitású akkumulátorral rendelkezik, így a mindennapi használat zenehallgatás, játék vagy fényképezőgép használata közben nem okoz energiahiányt. A videókhoz akár 34 órán keresztül is hozzáférhetsz!', '10.png', 5, 1, 0),
(11, 'Xiaomi Redmi 15 8/256GB Okostelefon, lila', 69990, 'lila', '2340x1080', 'Qualcomm® Snapdragon™ 685', 'Memóriaméret RAM: 8GB\r\nHáttértár: 256 GB', 'HyperOS', '', 'A készülék nagy kapacitású, 7000 mAh-s akkumulátorával hosszú üzemidőt biztosít, így egész napos használatra is alkalmas. A 6,9”-es FHD+ kijelző éles és élénk képmegjelenítést nyújt, a Snapdragon® 685 processzor pedig gördülékeny, gyors működést garantál. A 50 MP-es AI dupla kamera kiváló fotókat készít különböző körülmények között, a 33W-os gyorstöltés pedig gyorsan feltölti az eszközt. A készülék stílusos megjelenésű, és IP64 védelemnek köszönhetően víz- és porálló, így tartós és megbízható mindennapi használatra.', '11.png', 6, 1, 0),
(12, 'HUAWEI nova 12i 8GB/128GB Black', 104990, 'fekete', ' 2388 × 1080', 'Qualcomm Snapdragon 680', 'Rendszermemória: (RAM) 8 GB\r\nBelső memória: 128 GB', ' Android', 'Magasság: 16,33 cm\r\nSzélesség: 7,47 cm\r\nMélység: 0,84 cm\r\nSúly: 199 g', 'Mobiltelefon - 6,7\"-es IPS kijelző 2388 × 1080 felbontással (90Hz), 8 GB RAM, 128 GB belső tárhely, dual SIM, Qualcomm Snapdragon 680 processzor, kameramodul: 108Mpx (f/1,9) fő kamera, 8Mpx felbontású előlapi kamera, ujjlenyomat-olvasó, GPS, NFC, LTE, USB-C csatlakozó, gyorstöltés 40W, 5000 mAh kapacitású akkumulátor, megjelenés éve 2024', '12.png', 7, 1, 0),
(13, 'Lenovo Idea Tab TB336FU 8GB+256GB Luna Grey + Pencil + Case', 101790, 'szürke', 'QHD 2560 × 1600', 'Mediatek Dimensity 6300', 'RAM mérete: 8 GB (8 192 MB)\r\nTárhely kapacitás: 256 GB', ' Google Android', 'Magasság: 254,59 mm (25,46 cm)\r\nSzélesség: 166,15 mm (16,62 cm)\r\nMélység: 6,99 mm (0,7 cm)\r\nTömeg: 480 g (0,48 kg)', 'Tablet - 11\" QHD 2560 × 1600 IPS kijelző, Mediatek Dimensity 6300 2 GHz, 8 GB RAM, 256 GB tárhely, memóriakártya max. mérete 256 GB, WiFi, Bluetooth, GPS, 8 Mpx fő (hátsó) kamera, 5 Mpx szelfi kamera, USB-C, 20W gyors töltés, 7040 mAh akkumulátor kapacitás, Android 15', '13.png', 8, 3, 6),
(14, 'Samsung Galaxy A55 5G 256GB', 169990, 'kék', '120 Hz 2400x1080', 'Exynos 1480', '256 GB / 8 GB RAM', 'Android', '161.1 x 77.4 x 8.2 mm', 'Samsung középkategóriás okostelefon prémium kijelzővel.', '14.png', 1, 1, 4),
(15, 'Samsung Galaxy S24 Ultra Tok', 7990, 'fekete', '', '', '', '', '', 'Eredeti Samsung bőrtok Galaxy S24 Ultra modellhez.', '15.png', 1, 5, 0),
(16, 'Samsung Galaxy Buds FE', 29990, 'fehér', '', '', '', '', '', 'Samsung vezeték nélküli fülhallgató aktív zajszűréssel.', '16.png', 1, 4, 0),
(17, 'Samsung 45W USB-C Töltő', 12990, 'fehér', '', '', '', '', '', 'Gyors töltő adapter USB-C csatlakozóval.', '17.png', 1, 6, 0),
(18, 'Samsung 10000 mAh Powerbank', 13990, 'szürke', '', '', '', '', '', 'Kompakt méretű Samsung powerbank gyorstöltéssel.', '18.png', 1, 7, 0),
(19, 'Apple iPhone 15 Pro 256GB', 499990, 'titán', '120 Hz OLED', 'Apple A17 Pro', '256 GB / 8 GB RAM', 'iOS', '146.6 x 70.6 x 8.3 mm', 'Apple csúcskategóriás okostelefon titán házzal.', '19.png', 2, 1, 0),
(20, 'Apple Lightning Töltőkábel', 8990, 'fehér', '', '', '', '', '', 'Eredeti Apple Lightning–USB kábel.', '20.png', 2, 6, 0),
(21, 'Apple AirPods 2', 45990, 'fehér', '', '', '', '', '', 'Apple vezeték nélküli fülhallgató.', '21.png', 2, 4, 0),
(22, 'Apple iPad 10th Gen Tok', 6990, 'kék', '', '', '', '', '', 'Védőtok Apple iPad 10. generációhoz.', '22.png', 2, 5, 0),
(23, 'Apple MagSafe Powerbank', 44990, 'fehér', '', '', '', '', '', 'Apple mágneses powerbank iPhone készülékekhez.', '23.png', 2, 7, 0),
(24, 'Nokia G42 5G 128GB', 89990, 'szürke', '90 Hz 2400x1080', 'Snapdragon 480+', '128 GB / 6 GB RAM', 'Android', '165 x 75.8 x 8.6 mm', 'Strapabíró Nokia okostelefon 5G támogatással.', '24.png', 3, 1, 0),
(25, 'Nokia 2660 Flip', 28990, 'fekete', '', '', '', '', '', 'Klasszikus kagylótelefon nagy gombokkal.', '25.png', 3, 2, 0),
(26, 'Nokia Vezetékes Fülhallgató', 3990, 'fekete', '', '', '', '', '', '3.5 mm jack csatlakozós Nokia fülhallgató.', '26.png', 3, 4, 0),
(27, 'Nokia USB-C Töltő', 5990, 'fehér', '', '', '', '', '', 'Nokia gyári USB-C töltő.', '27.png', 3, 6, 0),
(28, 'Nokia 20000 mAh Powerbank', 16990, 'fekete', '', '', '', '', '', 'Nagy kapacitású Nokia powerbank.', '28.png', 3, 7, 0),
(29, 'LG Velvet 5G', 109990, 'piros', '60 Hz OLED', 'Snapdragon 765G', '128 GB / 6 GB RAM', 'Android', '', 'Prémium LG okostelefon ívelt kijelzővel.', '29.png', 4, 1, 0),
(30, 'LG Bluetooth Fülhallgató', 19990, 'fekete', '', '', '', '', '', 'LG vezeték nélküli fülhallgató.', '30.png', 4, 4, 0),
(31, 'LG USB-C Töltő', 6490, 'fehér', '', '', '', '', '', 'LG gyári töltő adapter.', '31.png', 4, 6, 0),
(32, 'LG Tablet Tok', 5990, 'szürke', '', '', '', '', '', 'Védőtok LG tabletekhez.', '32.png', 4, 5, 0),
(33, 'LG Powerbank 10000 mAh', 12990, 'szürke', '', '', '', '', '', 'LG kompakt powerbank.', '33.png', 4, 7, 0),
(34, 'Sony Xperia 5 V 128GB', 329990, 'fekete', '120 Hz OLED 2520x1080', 'Snapdragon 8 Gen 2', '128 GB / 8 GB RAM', 'Android', '154 x 68 x 8.6 mm', 'Kompakt prémium Sony okostelefon erős kamerával.', '34.png', 5, 1, 0),
(35, 'Sony Xperia 1 V Tok', 9990, 'fekete', '', '', '', '', '', 'Eredeti Sony védőtok Xperia 1 V készülékhez.', '35.png', 5, 5, 0),
(36, 'Sony WH-1000XM5 Fejhallgató', 149990, 'fekete', '', '', '', '', '', 'Sony csúcskategóriás zajszűrős fejhallgató.', '36.png', 5, 4, 0),
(37, 'Sony USB-C 30W Töltő', 12990, 'fehér', '', '', '', '', '', 'Sony gyors töltő adapter.', '37.png', 5, 6, 0),
(38, 'Sony 20000 mAh Powerbank', 24990, 'szürke', '', '', '', '', '', 'Nagy kapacitású Sony powerbank.', '38.png', 5, 7, 0),
(39, 'Xiaomi Redmi Note 13 Pro 5G', 129990, 'fekete', '120 Hz AMOLED 2712x1220', 'Snapdragon 7s Gen 2', '256 GB / 8 GB RAM', 'HyperOS', '161.2 x 74.3 x 8 mm', 'Xiaomi középkategóriás bestseller okostelefon.', '39.png', 6, 1, 0),
(40, 'Xiaomi Redmi A3', 29990, 'kék', '', '', '', '', '', 'Egyszerű gombos telefon alapfunkciókkal.', '40.png', 6, 2, 0),
(41, 'Xiaomi Pad 6 256GB', 159990, 'szürke', '144 Hz 2880x1800', 'Snapdragon 870', '256 GB / 8 GB RAM', 'Android', '254 x 165 x 6.5 mm', 'Nagy teljesítményű Xiaomi tablet.', '41.png', 6, 3, 0),
(42, 'Xiaomi Buds 3', 24990, 'fehér', '', '', '', '', '', 'Xiaomi vezeték nélküli fülhallgató.', '42.png', 6, 4, 0),
(43, 'Xiaomi 33W USB-C Töltő', 6990, 'fehér', '', '', '', '', '', 'Xiaomi gyári gyorstöltő.', '43.png', 6, 6, 0),
(44, 'Huawei P60 Pro 256GB', 399990, 'fehér', '120 Hz OLED 2700x1220', 'Snapdragon 8+ Gen 1', '256 GB / 8 GB RAM', 'HarmonyOS', '161 x 74.5 x 8.3 mm', 'Huawei csúcskategóriás kamerás okostelefon.', '44.png', 7, 1, 0),
(45, 'Huawei MatePad 11', 139990, 'szürke', '120 Hz 2560x1600', 'Snapdragon 865', '128 GB / 6 GB RAM', 'HarmonyOS', '253 x 165 x 7.3 mm', 'Huawei tablet munkára és szórakozásra.', '45.png', 7, 3, 0),
(46, 'Huawei FreeBuds 5', 59990, 'fehér', '', '', '', '', '', 'Huawei prémium vezeték nélküli fülhallgató.', '46.png', 7, 4, 0),
(47, 'Huawei SuperCharge 66W', 15990, 'fehér', '', '', '', '', '', 'Huawei szupergyors töltő adapter.', '47.png', 7, 6, 0),
(48, 'Huawei 12000 mAh Powerbank', 17990, 'szürke', '', '', '', '', '', 'Huawei kompakt powerbank.', '48.png', 7, 7, 0),
(49, 'Lenovo Tab P12 256GB', 149990, 'szürke', '120 Hz 2944x1840', 'MediaTek Dimensity 7050', '256 GB / 8 GB RAM', 'Android', '293 x 190 x 6.9 mm', 'Nagy kijelzős Lenovo tablet.', '49.png', 8, 3, 6),
(50, 'Lenovo Tab M10 Tok', 5990, 'kék', '', '', '', '', '', 'Védőtok Lenovo Tab M10 készülékhez.', '50.png', 8, 5, 6),
(51, 'Lenovo USB-C 65W Töltő', 19990, 'fekete', '', '', '', '', '', 'Lenovo nagy teljesítményű USB-C töltő.', '51.png', 8, 6, 0),
(52, 'Lenovo Bluetooth Fülhallgató', 14990, 'fekete', '', '', '', '', '', 'Lenovo vezeték nélküli fülhallgató.', '52.png', 8, 4, 0),
(53, 'Lenovo 20000 mAh Powerbank', 22990, 'fekete', '', '', '', '', '', 'Lenovo nagy kapacitású powerbank.', '53.png', 8, 7, 0);

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
(3, 11, 44, 4, 'Jó a termék!', '2026-01-30 11:47:23'),
(4, 11, 1, 5, 'Nagyon jó termék!', '2026-02-12 10:26:53'),
(14, 11, 1, 5, 'Jó termék!', '2026-03-23 08:31:04'),
(15, 10, 2, 3, 'Annyira nem jó!', '2026-04-19 05:13:11');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `akcio`
--
ALTER TABLE `akcio`
  ADD PRIMARY KEY (`akcio_id`);

--
-- A tábla indexei `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blog_id`),
  ADD KEY `blog_fajta` (`blog_fajta`) USING BTREE;

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
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`rendeles_id`);

--
-- A tábla indexei `rendeles_termek`
--
ALTER TABLE `rendeles_termek`
  ADD PRIMARY KEY (`rendeles_id`,`rendeles_termek_id`);

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
-- AUTO_INCREMENT a táblához `akcio`
--
ALTER TABLE `akcio`
  MODIFY `akcio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `blog`
--
ALTER TABLE `blog`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `fajta`
--
ALTER TABLE `fajta`
  MODIFY `fajta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `rendeles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `termek`
--
ALTER TABLE `termek`
  MODIFY `termek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT a táblához `tipus`
--
ALTER TABLE `tipus`
  MODIFY `tipus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `velemeny`
--
ALTER TABLE `velemeny`
  MODIFY `velemeny_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
