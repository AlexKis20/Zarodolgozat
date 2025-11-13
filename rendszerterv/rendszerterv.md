# Rendszerterv

## 1. Bevezetés
A webshop lényege hogy különböző  elektronikai eszközöket tudjanak egyszerűen böngészni és venni.


## 2. Architektúra
Adatbázis: Msql, phpmyadmin
Backend? express.js
Frontend: React


## 3. Funkcionális köv.
Fő funkciók:
- keresési fül: */kereses*
- kosárhoz adás: */kosarhozadas*
- szűrés ár szerint: */szuresar*
- szűrés tipus szerint pl. pc és alkatrészei, laptop és alkatrészei, perifériák, telefonok: */szurestipus*
- szűrés márka szerint pl. samsung, lenovo: */szuresmarka*

Admin funkciók(Kornélia):
- törlés
- módosítás
- hozzáadás


## 4. Nem funkc. köv.
1. Front és Backend JSON-ben kommunikál
2. Hibakezelés...
3. Reszponzív
4. Jól áttekinthető kód

## 5. Adatb. terv

### 5.1 Táblák
telefon tábla (ebben a telefonon kívül a tabletet is bele soroljuk):
- telefon_id
- telefon_nev
- telefon_marka
- telefon_tipus
- telefon_leiras

marka Tábla:
- marka_id(kulcs)
- marka_nev

tipus Tábla:
- tipus_id
- tipus_nev

szamitogepieszkoz Tábla (ebbe lesz bele sorolva a pc és ahoz tartozó dolgok meg a laptop, ps és a többi konzolok):
- szamitogepieszkoz_id
- szamitogepieszkoz_nev
- szamitogepieszkoz_marka
- szamitogepieszkoz_tipus
- szamitogepieszkoz_leiras


### 5.2 Kapcsolatok
(tervezés alatt)

## 6. Adatáramlás
(tervezés alatt)

Írta:Kis Alex János
Dátum:2025.11.13.