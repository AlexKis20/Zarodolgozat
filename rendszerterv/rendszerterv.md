# Rendszerterv


## 1. Bevezetés

Nextify egy elektronikai webshop, amely az emberek számára lehetővé teszi különféle elektronikai eszközöket böngészni,
keresni és vásárolni. 

Az adminisztrátorok számára adminisztrációs panel áll rendelkezésre a termékek, akciók, hírek és felhasználók kezeléséhez.


## 2. Rendszer célja, motivációja

A Nextify webshop rendszer célja egy felhasználóbarát és hatékony elektronikai termékek eladást biztosító platform létrehozása.

Célok:
- Felhasználók számára könnyű és gyors termékkeresés, böngészés és vásárlás
- Szűrési lehetőségek
- Felhasználók által írható termékértékelések és vélemények
- Admin felhasználók számára egyszerű termék, hír és rendelés kezelés
- Biztonságos autentikáció és jogosultságkezelés

Motiváció:
- A mai digitális világban az online webshopok egyre fontosabbak
- A felhasználók időben szeretnék termékeket keresni és vásárolni
- Az elektronikai termékek népszerűek, így magas igény van rájuk
- A rendszernek jól kell kezeljen egyidejű felhasználókat
- Szükség van egy intuitív, könnyű kezelhetőségű felületre
- Az admin funkciók megkönnyítik az üzlet vezetését


## 3. Architektúra

- Adatbázis: MySQL
- Backend: Node.js + Express.js
- Frontend: React
- Autentikáció: JWT + bcrypt
- Fájlkezelés: Multer
- Kommunikáció: JSON (REST API)
- UI Framework: Bootstrap, Styled Components


## 4. Funkcionális követelmények

### 4.1 Nyilvános funkciók User bejelentkezés nélkül (Kiss Alex János)

Fő funkciók:
- keresési fül: /kereses
- szűrés ár szerint: /szuresar
- szűrés tipus szerint pl. pc és alkatrészei, laptop és alkatrészei, perifériák, telefonok: /szurestipus
- szűrés márka szerint pl. samsung, lenovo: /szuresmarka
- nyitólap megtekintése: kezdőlap hírek, akciók, megjelenítése
- termék részletek: képek, leírás, ár, márka, típus, vélemények megtekintése
- vélemények olvasása/írása: meglévő felhasználói vélemények, értékelések megjelenítése
- bejelentkezés/regisztráció: új fiók létrehozása, bejelentkezés


### 4.2 Nyilvános funkciók bejelentkezéssel (Kiss Alex János)

- kosár: termékek kosárhoz adása (frontend, még nem implementálva)

### 4.3 Admin funkciók (Várady Kornélia)

- vezérlőpult: rendelések vélemények megjelenése 10 mp-kénti váltással
- kezdőlap: megtekintés, törlés, módosítás, felvitel, keresés, rendezés
- termék: megtekintés, törlés, módosítás, felvitel, keresés, rendezés
- márka: törlés, módosítás, felvitel, keresés, rendezés
- típus: törlés, módosítás, felvitel, keresés, rendezés
- rendelés: teljesítve, megtekintés, törlés, módosítás, felvitel, keresés, rendezés
- akció: megtekintés, törlés, módosítás, felvitel, keresés, rendezés
- vélemény: törlés, keresés, rendezés


## 5. Nem funkcionális követelmények

1. Front és Backend JSON-ben kommunikál
2. Hibakezelés
3. Reszponzív
4. Jól áttekinthető, tiszta kód


## 6. Interfész leírás

Frontend szerkezet:
- Navbar: logó, keresősáv, márka/kategória szűrő linkek, bejelentkezés/regisztráció linkek
- Sidebar: navigációs menü (admin oldalon admin funkciók listája)
- Termékkatalógus: termékek táblázatos vagy kártyás nézete, szűrési lehetőségek
- Termékoldal: kép, ár, leírás, márka, típus, értékelések, vélemény írás gomb
- Bejelentkezés/Regisztráció oldal: felhasználónév és jelszó inputok
- Admin vezérlőpult: rendelések és vélemények valós idejű megjelenítése
- Admin termékkezelés: termékek listája, szerkesztés, törlés, új termék hozzáadás
- Admin márka/típus kezelés: márka és típus CRUD műveletek
- Admin kezdőlap kezelés: hírek, akciók, blog bejegyzések kezelése (CRUD műveletek) képfeltöltéssel
- Admin rendeléskezelés: rendelések listája, rendelési adatok, teljesítés státusza
- Admin vélemény kezelés: vélemények listája, törlés lehetőség

Grafikus elemek:
- Bootstrap komponensek: gombok, formok, modálok, táblázatok, kártyák
- Styled Components: egyedi stílusok és animációk
- Framer Motion: sima animációk és átmenetek
- Color scheme: professzionális, modern megjelenés
- Típografika: olvasható, hierarchikus szövegméretezés
- Ikonok: vizuális segítségnyújtás a funkcióknál

Reszponzivitás:
- Mobilnézetben: hamburger menü, egymenetes layoutok, touchscreen optimalizálás
- Tábla nézetben: kis képernyőhöz adaptív elrendezés
- Desktop nézetben: teljes funkciók, több oszlopos elrendezés
- CSS Media Query-k: Responsive.css segítségével kezelve

Navigáció:
- Navbar linkek: kezdőlap, termékkatalógus, keresés, márka szűrés
- Admin menü: sidebar menü az összes admin funkcióhoz
A felhasználói felület (UI) a Bootstrap és Styled Components használatával készült, biztosítva a modern, reszponzív megjelenést.

Felület elemei:
- Navbar: logó/kezdőlap link, keresősáv, márka szűrő, típus szűrő, bejelentkezés/regisztráció
- Sidebar (admin): navigációs menü az összes admin funkcióhoz (Termékek, Márka, Típus, Rendelések, Akciók, Hírek, Vélemények)
- Termékkatalógus: termékek cardok vagy táblázat nézetben, oldaltöltés, szűrési lehetőségek
- Termék részlet oldal: kép carousel, termék adatok, ár, márka, típus, akció kedvezmény, értékelés átlaga, vélemények
- Modal ablakok: bejelentkezés, regisztráció, vélemény írása, képek, törlés megerősítés
- Admin felületek: CRUD táblázatok (termék, márka, típus, rendelés, akció, hír, vélemény), keresés és szűrés, rendezés
- Vezérlőpult: real-time rendelések és vélemények megjelenítése, 10 másodpercenként frissítés

Felhasználói élmény:
- Intuitív navigáció: clear menük
- Validáció: real-time input ellenőrzés, hibaüzenetek
- Responsív design: mobilnézet, tábla nézet, desktop nézet

## 7. Adatbázis terv
Karakterkódolás: utf8_hungarian_ci

### 7.1 Táblák

akcio Tábla:
- akcio_id (elsődleges kulcs)
- akcio_nev	
- akcio_kedvezmeny	
- akcio_tipus	
- akcio_kezdete	
- akcio_vege

fajta Tábla:
- fajta_id (elsődleges kulcs)
- fajta_nev

felhasznalo Tábla:
- felhasznalo_id (elsődleges kulcs)
- felhasznalo_nev	
- felhasznalo_jelszo	
- felhasznalo_rang (idegen kulcs)

kezdolap Tábla:
- kezdolap_id (elsődleges	kulcs)
- kezdolap_cim	
- kezdolap_szoveg		
- kezdolap_datum	
- kezdolap_kep	
- kezdolap_fajta (idegen kulcs)

marka Tábla:
- marka_id (elsődleges kulcs)
- marka_nev

rang Tábla:
- rang_id (elsődleges kulcs)
- rang_nev

rendeles Tábla:
- rendeles_id (elsődleges kulcs)
- rendeles_felhasznalo_id	
- rendeles_nev	
- rendeles_cim	
- rendeles_telefonszam
- rendeles_datum	
- rendeles_teljesitve

rendeles_termek Tábla:
- rendeles_id (elsődleges kulcs)
- rendeles_termek_id (elsődleges kulcs)
- rendeles_ar	
- rendeles_darab

termek Tábla: 
- termek_id (elsődleges kulcs)
- termek_nev	
- termek_ar	int	
- termek_szin	
- termek_kijelzo	
- termek_processzor	
- termek_kapacitas	
- termek_oprendszer		
- termek_meret	
- termek_leiras		
- termek_kep	
- termek_marka (idegen kulcs)
- termek_tipus (idegen kulcs)
- termek_akcio_id

tipus Tábla:
- tipus_id (elsődleges kulcs)
- tipus_nev

velemeny Tábla:
- velemeny_id (elsődleges kulcs)
- velemeny_felhasz_id (idegen kulcs)
- velemeny_termek_id (idegen kulcs)
- velemeny_ertekeles
- velemeny_szoveg
- velemeny_datum


### 7.2 Kapcsolatok

Idegen kulcsok biztosítják a táblák közötti kapcsolatokat.

- a termek_id kapcsolódik a velemeny_termek_id felé
- a termek_marka kapcsolódik a marka_id felé
- a termek_tipus kapcsolódik a tipus_id felé 
- a kezdolap_fajta kapcsolódik a fajta_id felé
- a felhasznalo_rang kapcsolódik rang_id felé 
- a velemeny_felhasz_id kapcsolódik felhasznalo_id felé

## 8. Diagramok (UML osztály, állapot, aktivációs)
### 8.1 Adatbázis osztálydiagram

```
Termek 
├─ termek_id (PK)
├─ termek_nev
├─ termek_ar
├─ termek_szin
├─ termek_kijelzo
├─ termek_processzor
├─ termek_kapacitas
├─ termek_oprendszer
├─ termek_meret
├─ termek_leiras
├─ termek_kep
├─ termek_marka (FK) ──→ marka_id
├─ termek_tipus (FK) ──→ tipus_id
└─ termek_akcio_id (FK) ──→ akcio_id

Marka 
├─ marka_id (PK)
└─ marka_nev

Tipus
├─ tipus_id (PK)
└─ tipus_nev

Felhasznalo 
├─ felhasznalo_id (PK)
├─ felhasznalo_nev
├─ felhasznalo_jelszo
└─ felhasznalo_rang (FK) ──→ rang_id

Rang 
├─ rang_id (PK)
└─ rang_nev

Velemeny 
├─ velemeny_id (PK)
├─ velemeny_felhasz_id (FK) ──→ felhasznalo_id
├─ velemeny_termek_id (FK) ──→ termek_id
├─ velemeny_ertekeles
├─ velemeny_szoveg
└─ velemeny_datum

Kezdolap 
├─ kezdolap_id (PK)
├─ kezdolap_cim
├─ kezdolap_szoveg
├─ kezdolap_datum
├─ kezdolap_kep
└─ kezdolap_fajta (FK) ──→ fajta_id

Fajta 
├─ fajta_id (PK)
└─ fajta_nev

Akcio 
├─ akcio_id (PK)
├─ akcio_nev
├─ akcio_kedvezmeny
├─ akcio_tipus
├─ akcio_kezdete
└─ akcio_vege

Rendeles 
├─ rendeles_id (PK)
├─ rendeles_felhasznalo_id (FK) ──→ felhasznalo_id
├─ rendeles_nev
├─ rendeles_cim
├─ rendeles_telefonszam
├─ rendeles_datum
└─ rendeles_teljesitve

Rendeles_Termek 
├─ rendeles_id (FK) ──→ rendeles_id
├─ rendeles_termek_id (FK) ──→ termek_id
├─ rendeles_ar
└─ rendeles_darab
```

### 8.2 Rendszer Komponens Diagram

```
┌─────────────────────────────────────────────────┐
│              Nextify Webshop Rendszer           │
└─────────────────────────────────────────────────┘

┌──────────────────────────────┐  ┌──────────────────────────────┐
│   Frontend (React 19)        │  │  Backend (Node.js+Express)   │
│──────────────────────────────│  │──────────────────────────────│
│                              │  │                              │
│ Oldalak:                     │  │ Fő modulok:                  │
│ - App.js                     │  │ - backend.js (szerver)       │
│ - Login.js                   │  │ - login.js (autentikáció)    │
│ - Register.js                │  │ - authMiddleware.js          │
│ - Hirek.js                   │  │                              │
│ - User.js                    │  │ API Végpontok:               │
│                              │  │ - GET /termek                │
│ Termékoldalak:               │  │ - GET /tipus                 │
│ - Termekek.js                │  │ - GET /marka                 │
│ - TermekTipusSzerint.js      │  │ - POST /tipusuTermek         │
│ - LenyiloTipus.js            │  │ - POST /markajuTermek        │
│                              │  │ - POST /termeknevKeres       │
│ Admin oldalak:               │  │ - GET /kezdolap              │
│ - Vezerlopult.js             │  │ - POST /kezdolapHozzaad      │
│ - Termek.js                  │  │ - PUT /kezdolapModosit       │
│ - Marka.js                   │  │ - DELETE /kezdolapTorles     │
│ - Tipus.js                   │  │ - POST /ujVelemeny           │
│ - Rendeles.js                │  │ - GET /velemenyek/:id        │
│ - Akcio.js                   │  │ - GET /velemenyAtlag/:id     │
│ - Velemeny.js                │  │ - POST /login/login          │
│                              │  │ - POST /login/register       │
│ Komponensek:                 │  │                              │
│ - Navbar.js                  │  │ Middleware:                  │
│ - Sidebar.js                 │  │ - JWT autentikáció           │
│ - Modal.js                   │  │ - Jogosultságkezelés         │
│ - DataTable.js               │  │ - CORS                       │
│ - BeviteliMezo.js            │  │ - Multer (fájlfeltöltés)     │
│ - Kereses.js                 │  │                              │
│ - Rendezes.js                │  │ Adatbázis:                   │
│ - SidebarData.js             │  │ - MySQL (MariaDB 10.4)       │
│                              │  │ - nextifyadatb               │
│ Segédfüggvények:             │  │                              │
│ - validalas.js               │  │ Könyvtárak:                  │
│ - formazas.js                │  │ - express (szerver)          │
│                              │  │ - mysql (adatbázis)          │
│                              │  │ - bcrypt (jelszó)            │
│                              │  │ - jsonwebtoken (JWT)         │
│                              │  │ - multer (fájlok)            │
│                              │  │ - cors (CORS)                │
└────────────────┬─────────────┘  └────────────────┬─────────────┘
                 │                                 │
                 │         JSON/REST API           │
                 │◀──────────────────────────────▶│
                 │                                 │
                 │             SQL                 │
                 └──────────────────┬──────────────┘
                                    │
                         ┌──────────▼────────────┐
                         │  MySQL Adatbázis      │
                         │  nextifyadatb         │
                         │────────────────────── │
                         │ Táblák:               │
                         │ - termek              │
                         │ - marka               │
                         │ - tipus               │
                         │ - felhasznalo         │
                         │ - rang                │
                         │ - velemeny            │
                         │ - kezdolap            │
                         │ - fajta               │
                         │ - akcio               │
                         │ - rendeles            │
                         │ - rendeles_termek     │
                         └───────────────────────┘

Autentikáció: JWT + bcrypt
Fájlkezelés: Multer
Kommunikáció: REST API (JSON)
UI: Bootstrap + Styled Components
```

### 8.3 Felhasználó Interakciók Diagramja

```
┌────────────────────────────────────────┐
│  Nem bejelentkezett Felhasználó        │
└────────────────┬───────────────────────┘
                 │
                 ├──▶ Termékkatalógus böngészése
                 │    ├─ Termekek.js (főlista)
                 │    ├─ TermekTipusSzerint.js
                 │    ├─ LenyiloTipus.js (kategória dropdown)
                 │    ├─ Keresés.js (név szerinti keresés)
                 │    ├─ Rendezes.js (rendezés)
                 │    └─ DataTable.js (táblázatos megjelenítés)
                 │
                 ├──▶ Termék részletei megtekintése
                 │    ├─ Termék adatok
                 │    ├─ Márka információ
                 │    ├─ Típus információ
                 │    ├─ Akciók és kedvezmények
                 │    ├─ Képgaléria
                 │    ├─ Leírás
                 │    └─ Ár megjelenítése
                 │
                 ├──▶ Szűrés és keresés
                 │    ├─ Márka szűrés (MarkaKeres.js)
                 │    ├─ Típus szűrés (szurestipus)
                 │    ├─ Ár szerinti szűrés (szuresar)
                 │    └─ Név szerinti keresés (KeresNev.js)
                 │
                 ├──▶ Bejelentkezés/Regisztráció
                 │    ├─ Login.js (bejelentkezési form)
                 │    │  └─ Felhasználónév, jelszó input
                 │    │  └─ Bejelentkezés gomb
                 │    │  └─ Regisztrációra link
                 │    │
                 │    └─ Register.js (regisztrációs form)
                 │       ├─ Felhasználónév input
                 │       ├─ Jelszó input
                 │       ├─ Jelszó megerősítés
                 │       └─ Regisztrálás gomb
                 │
                 ├──▶ Hírek akciók blog megtekintése
                 │    ├─ Hirek.js (kezdőlap)
                 │    ├─ Akciók megjelenítése
                 │    ├─ Megjelenések
                 │    └─ Blog bejegyzések
                 │
                 ├──▶ Vélemények olvasása
                 │    ├─ Értékelés csillagok
                 │    ├─ Szerző neve
                 │    ├─ Vélemény szövege
                 │    └─ Beküldés dátuma
                 │
                 └──▶ Navbar navigáció
                      ├─ Nextify logó 
                      ├─ Termékkatalógus link
                      ├─ Keresési mező
                      ├─ Márka szűrés link
                      ├─ Bejelentkezés link
                      └─ Regisztráció link

┌────────────────────────────────────────┐
│    Bejelentkezett Felhasználó          │
└────────────────┬───────────────────────┘
                 │
                 ├──▶ Összes nyilvános funkció
                 │    (lásd: Nem bejelentkezett felhasználó)
                 │
                 ├──▶ Vélemény olvasása és írása
                 │    ├─ Meglévő vélemények olvasása
                 │    ├─ Modal forma nyitása
                 │    ├─ Értékelés kiválasztása (1-5 csillag)
                 │    ├─ Vélemény szöveg beírása
                 │    ├─ Beküldés gomb
                 │    └─ Megerősítés üzenet
                 │
                 ├──▶ Felhasználó profil
                 │    ├─ Profil adatok megtekintése
                 │    ├─ Saját vélemények listája
                 │    └─ Saját rendelések listája (terv)
                 │
                 ├──▶ Kosár kezelés
                 │    ├─ Termékek kosárhoz adása (terv)
                 │    ├─ Kosár megtekintése (terv)
                 │    ├─ Mennyiség módosítása (terv)
                 │    ├─ Termék eltávolítása (terv)
                 │    └─ Rendelés leadása (terv)
                 │
                 └──▶ Kijelentkezés
                      └─ Token törlése, localStorage ürítés

┌────────────────────────────────────────┐
│       Admin Felhasználó                │
└────────────────┬───────────────────────┘
                 │
                 ├──▶ Vezérlőpult 
                 │    ├─ Vezerlopult.js
                 │    ├─ rendelések
                 │    ├─ vélemények
                 │    └─ 10 mp-kénti frissítés
                 │
                 ├──▶ Termék kezelés
                 │    ├─ Termek.js (lista)
                 │    ├─ TermekFelvitel.js (új termék)
                 │    ├─ TermekModosit.js (szerkesztés)
                 │    ├─ TermekMegtekintes.js (részletek)
                 │    ├─ Keresés
                 │    └─ Rendezés 
                 │
                 ├──▶ Márka kezelés
                 │    ├─ Marka.js (lista)
                 │    ├─ MarkaFelvitel.js (új márka)
                 │    ├─ MarkaModosit.js (szerkesztés)
                 │    ├─ Törlés
                 │    ├─ Keresés
                 │    └─ Rendezés
                 │
                 ├──▶ Típus kezelés
                 │    ├─ Tipus.js (lista)
                 │    ├─ TipusFelvitel.js (új típus)
                 │    ├─ TipusModosit.js (szerkesztés)
                 │    ├─ Törlés
                 │    ├─ Keresés
                 │    └─ Rendezés
                 │
                 ├──▶ Hír/akció/blog kezelés
                 │    ├─ Kezdolap.js / Akcio.js (lista)
                 │    ├─ KezdolapFelvitel.js (új hír)
                 │    │  ├─ Cím input
                 │    │  ├─ Szöveg textarea
                 │    │  ├─ Dátum picker
                 │    │  ├─ Kategória dropdown (Akció/Megjelenés/Blog)
                 │    │  ├─ Kép feltöltés (Multer)
                 │    │  └─ Mentés gomb
                 │    │
                 │    ├─ KezdolapModosit.js (szerkesztés)
                 │    ├─ Törlés megerősítéssel
                 │    ├─ Keresés
                 │    └─ Rendezés 
                 │
                 ├──▶ Rendelés kezelés
                 │    ├─ Rendeles.js (lista)
                 │    ├─ RendelesMegtekintes.js (részletek)
                 │    │  ├─ Rendelő neve, címe, telefonszáma
                 │    │  ├─ Rendelési dátum
                 │    │  ├─ Megrendelt termékek listája
                 │    │  ├─ Egységárak, darabszámok
                 │    │  └─ Teljesítés státusza
                 │    │
                 │    ├─ Rendelés módosítása
                 │    ├─ "Teljesítve" jelölés
                 │    ├─ Törlés
                 │    ├─ Keresés 
                 │    └─ Rendezés 
                 │
                 ├──▶ Vélemény kezelés
                 │    ├─ Velemeny.js (lista)
                 │    ├─ Vélemény szövegének megtekintése
                 │    ├─ Értékelés megtekintése
                 │    ├─ Szerző neve
                 │    ├─ Termék neve
                 │    ├─ Törlés (nem megfelelő vélemények)
                 │    ├─ Keresés
                 │    └─ Rendezés (dátum, értékelés)
                 │
                 ├──▶ Admin Sidebar
                 │    ├─ Sidebar.js
                 │    ├─ SidebarData.js (navigációs adatok)
                 │    ├─ SubMenu.js (almenük)
                 │    └─ Navigációs linkek az összes admin funkcióhoz
                 │
                 └──▶ Kijelentkezés
                      └─ Admin felülettől visszalépés
```
### 8.4 Állapotdiagram
Állapotdiagram (Felhasználó):

```
                    ┌─────────────────────────┐
                    │ Nem bejelentkezett      │
                    │ felhasználó             │
                    └────────┬────────────────┘
                             │
                  bejelentkezés gomb
                          │
           ┌──────────────┴──────────────┐
           │                             │
           ▼                             ▼
    ┌────────────────┐          ┌──────────────────┐
    │ Bejelentkezési │          │ Regisztrációs    │
    │ oldal          │          │ oldal            │
    └────────┬───────┘          └────────┬─────────┘
             │                           │
      bejelentkezés                 regisztráció
      sikeres/hibás                    │
             │                         │
             │        ┌────────────────┘
             │        │
             ▼        ▼
      ┌──────────────────────────┐
      │ Bejelentkezett           │
      │ felhasználó              │
      ├──────────────────────────┤
      │ - Böngészés              │
      │ - Keresés                │
      │ - Szűrés                 │
      │ - Vélemény írása         │
      │ - Rendelés               │
      └────────┬─────────────────┘
               │
         kijelentkezés / token lejárt
               │
               ▼
      ┌──────────────────────────┐
      │ Nem bejelentkezett       │
      │ felhasználó              │
      └──────────────────────────┘

Admin bejelentkezés:
      ┌──────────────┐
      │ Bejelentkezés│
      │ (admin)      │
      └────────┬─────┘
               │
        admin jogosultság
        ellenőrzése
               │
               ▼
      ┌──────────────────────────┐
      │ Admin felhasználó        │
      ├──────────────────────────┤
      │ - Vezérlőpult            │
      │ - Kezdőlap               │           
      │ - Termék kezelés         │
      │ - Márka kezelés          │
      │ - Tipus kezelés          │
      │ - Rendelés kezelés       │
      │ - Akció kezelés          │
      │ - Vélemény kezelés       │
      └────────┬─────────────────┘
               │
         kijelentkezés
               │
               ▼
      ┌──────────────────────────┐
      │ Nem bejelentkezett       │
      │ felhasználó              │
      └──────────────────────────┘
```
### 8.5 Aktivációs diagram példa
Aktivációs diagram (Admin termék feltöltés):

```
Start
  │
  ▼
Admin belép az admin felületre
  │
  ▼
Admin a "Termék hozzáadása" gombra kattint
  │
  ▼
TermekFelvitel forma megnyitása
  │
  ▼
Admin kitölti az adatokat
├─ Terméknév
├─ Ár
├─ Leírás
├─ Paraméterek (szín, kijelző, processzor, stb.)
├─ Márka kiválasztása
├─ Típus kiválasztása
└─ Kép feltöltése (Multer)
  │
  ▼
Forma validáció
  │
  ├─ NEM (Hibás adatok)
  │  │
  │  ▼
  │  Hibaüzenet megjelenítése
  │  │
  │  └──────────┐
  │             │
  │             └──▶ Vissza az adatok kitöltéshez
  │
  └─ IGEN (Minden OK)
     │
     ▼
Frontend: POST /termekFelvitel
├─ termékadatok
├─ kép fájl
└─ JWT token
     │
     ▼
Backend: Token validálása
     │
     ├─ Érvénytelen token
     │  │
     │  ▼
     │  Hibaüzenet: Kijelentkezés szükséges
     │
     └─ Érvényes token
        │
        ▼
Backend: Admin jogosultság ellenőrzése
        │
        ├─ Nem admin
        │  │
        │  ▼
        │  Hibaüzenet: Nincs jogosultság
        │
        └─ Admin
           │
           ▼
Backend: Kép feltöltése szerverre
        │
        ▼
Backend: INSERT INTO termek
        │
        ▼
MySQL: Új termék rögzítése
        │
        ▼
Backend: SELECT visszaadott termék_id
        │
        ▼
Backend: JSON válasz (sikeres üzenet + termék_id)
        │
        ▼
Frontend: Sikeres üzenet megjelenítése
        │
        ▼
Frontend: Átirányítás a termékek listájára
        │
        ▼
Admin megtekinti az új terméket a listában
        │
        ▼
        End
```

## 9. Adatáramlás

Az adatáramlás a Nextify rendszerben a Frontend és Backend közötti REST API kommunikáción alapul.

### 9.1 Autentikáció és felhasználókezelés

Frontend: Bejelentkezési vagy regisztrációs form kitöltése (felhasználónév, jelszó)
Frontend: POST kérés a Backendnek (felhasznalo_nev, felhasznalo_jelszo)
Backend: Adatbázisban felhasználó keresése / új felhasználó rögzítése
Backend: Jelszó ellenőrzése bcrypt-al / jelszó hash-elése
Backend: JWT token generálása (24 órás érvényességgel)
Frontend: Token tárolása localStorage-ben
Frontend: Jogosultság alapján Navbar/Sidebar tartalom módosítása

### 9.2 Nyilvános adatok olvasása és szűrése

Frontend: Felhasználó adatot szeretne megtekinteni (termékek, hírek, akciók)
Frontend: GET kérés a Backendnek paraméterekkel (pl. tipus, marka, keresett_szöveg)
Backend: Lekérdezés az adatbázisból WHERE/JOIN feltételekkel
Backend: Eredmények visszaadása JSON formátumban
Frontend: Adatok megjelenítése táblázat vagy kártyák formájában

Kiterjed:
- Termékek böngészése, szűrése márka/típus/név alapján
- Hírek, akciók, blog bejegyzések megtekintése
- Vélemények lekérdezése termékekhez
- Adatok rendezése és oldalak közötti navigáció

### 9.3 Felhasználó által generált tartalom

Frontend: Bejelentkezett felhasználó adatot szeretne beküldeni (pl. vélemény, szállítási adat)
Frontend: POST kérés a Backendnek JWT tokennel
Backend: Token validálása
Backend: Adatok validálása és beillesztése az adatbázisba
Adatbázis: Új rekord rögzítése
Backend: Megerősítés visszaadása (pl. új ID)
Frontend: Felhasználó visszajelzése

Kiterjed:
- Termékértékelések és vélemények beküldése
- Rendelések létrehozása
- Profil adatok módosítása

### 9.4 Admin CRUD műveletek

Frontend: Admin felhasználó adatot szeretne kezelni (termék, márka, típus, hír, egyéb)
Frontend: Megfelelő kérés (POST, PUT, DELETE) JWT tokennel és admin jogosultsággal
Backend: Token validálása, admin jogosultság ellenőrzése
Backend: Adat validálása
Backend: Adatbázis módosítása (INSERT, UPDATE, DELETE)
Adatbázis: Rekord rögzítése/módosítása/törlése
Backend: Megerősítés vagy hiba válasz
Frontend: Megerősítés megjelenítése, lista frissítése

Kiterjed:
- Termékek, márkák, típusok kezelése
- Hírek, akciók, blog bejegyzések kezelése (képfeltöltéssel Multer)
- Rendelések kezelése és teljesítés jelölése
- Vélemények moderálása (törlés)

### 9.5 Speciális műveletek

Képfeltöltés: Admin híreket, termékeket, kezdőlapot készít képekkel
Frontend: Multer-rel képfájl feltöltése az adatok mellett
Backend: Kép mentése a szerverhez, elérési út tárolása az adatbázisban

Keresés és szűrés: Felhasználó szöveg alapján függően keresi az adatokat
Frontend: Keresési szöveg és szűrési paraméterek küldése GET kéréssel
Backend: Adatbázis lekérdezés LIKE vagy egyéb WHERE feltételekkel
Backend: Releváns eredmények visszaadása

Rendezés: Felhasználó adatok sorrendjét módosítja
Frontend: Rendezési paraméter (oszlop, sor ASC/DESC) POST/GET kéréssel
Backend: ORDER BY SQL parancs alkalmazása
Backend: Rendezett eredmények visszaadása


## 10. Biztonság

- Jelszavak bcrypt segítségével hash-elve kerülnek tárolásra
- JWT alapú autentikáció (24 órás lejárattal)
- Jogosultságkezelés (user / admin szerepkörök)
- Védelmek:
  - SQL injection ellen (prepared statementek)
  - XSS ellen (input validáció)
- Token tárolása kliens oldalon (localStorage)

## 11. Jogosultságkezelés

A rendszer két fő szerepkört kezel:

- Felhasználó (user)
- Adminisztrátor (admin)

Az admin jogosultságok a "rang" tábla alapján kerülnek meghatározásra.

Az admin:
- hozzáfér az admin felülethez
- kezelheti a termékeket, márkákat, tipusokat, rendeléseket,kezdőlapot, véleményeket

A felhasználó:
- vásárolhat
- véleményt írhat

## 12. Karbantartás

### 12.1 Karbantartási stratégia

A rendszer karbantartása három típusra osztható:

Preventív karbantartás:
- Rendszeres szoftver frissítések: npm csomagok, Node.js, React frissítése
- Biztonsági foltok alkalmazása: JWT, bcrypt, Express.js biztonsági frissítések
- Adatbázis optimalizálás: indexek ellenőrzése, lekérdezések optimalizálása
- Teljesítmény audit: rendszeres teljesítményelemzés
- Biztonsági audit: kódvizsgálat, sebezhetőségek keresése
- Naplófájlok ellenőrzése: hibák keresése, anomáliák feltárása

Korrekciós karbantartás:
- Hibajavítások: bejelentett problémák azonosítása és javítása
- Szoftver hibák: logikai hibák, üzletilogika problémái
- Adatbázis hibák: kapcsolódási problémák, konkurrencia problémák
- Felhasználói felület hibák: eltérések a tervtől

Adaptív karbantartás:
- Új funkciók hozzáadása: felhasználói igények alapján
- Frissítések: technológiai fejlődéshez való alkalmazkodás
- Kompatibilitás: új böngészőkkel, operációs rendszerekkel
- Integrációk: új szolgáltatások integrálása

Írta: Kiss Alex János és Várady Kornélia

Dátum: 2025.11.13.