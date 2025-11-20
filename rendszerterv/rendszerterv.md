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
termek tábla (ebben a telefonon kívül a tabletet is bele soroljuk):
- termek_id(kulcs)
- termek_nev
- termek_ar
- termek_szin
- termek_kijelzo
- termek_processzor
- termek_kapacitás
- termek_oprendszer
- termek_meret
- termek_leiras
- termek_kep
- termek_marka
- termek_tipus

marka Tábla:
- marka_id(kulcs)
- marka_nev

tipus Tábla:
- tipus_id(kulcs)
- tipus_nev




### 5.2 Kapcsolatok
a marka_id kapcsolódik a termek_marka és a kiegeszito_marka.
a tipus_id kapcsolódik a termek_marka és a kiegeszito_marka.

## 6. Adatáramlás
(tervezés alatt)

Írta:Kis Alex János
Dátum:2025.11.13.