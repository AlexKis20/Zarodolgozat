# Rendszerterv

## 1. Bevezetés
A webshop lényege hogy különböző elektronikai eszközöket tudjanak egyszerűen böngészni és venni.


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

Admin funkciók:
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
telefon tábla:
- 

marka Tábla:
- 

tipus Tábla:
- 

### 5.2 Kapcsolatok
A jatekos tábla kapcsolatban van a bejegyzés táblával, a bejegyzes_jatekos mezőn keresztül, a játékosról szóló hírek, pletykák... 

## 6. Adatáramlás
Bejegyzés létrehozásának folyamata:
1. felh. beírja szöveg
2. felh. kiválasztja lenyílóból a játékos nevét
3. felh. becenevét beírja, felvitel gomb 
4. post-os kérés indul a backendre
5. backend tárolja adatb-ben
6. a lapon frissül a új bejegyzéssel


