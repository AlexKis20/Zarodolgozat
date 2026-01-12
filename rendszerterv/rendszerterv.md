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

Admin funkciók (Kornélia):
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
termek Tábla (ebben a telefonon kívül a tabletet is bele soroljuk):
- termek_id (elsődleges kulcs)
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
- termek_marka (idegen kulcs)	
- termek_tipus (idegen kulcs)	

marka Tábla:
- marka_id (elsődleges kulcs)
- marka_nev

tipus Tábla:
- tipus_id (elsődleges kulcs)
- tipus_nev


blog Tábla:
- blog_id (elsődleges kulcs)
- blog_cim 	
- blog_szoveg 		
- blog_datum 	
- blog_kep 	
- blog_fajta (idegen kulcs)	

fajta Tábla:
- fajta_id (elsődleges kulcs)
- fajta_nev 

felhasznalo Tábla:
- felhasznalo_id (elsődleges kulcs)
- felhasznalo_nev
- felhasznalo_jelszo
- felhasznalo_rang (idegen kulcs)

rang Tábla:
- rang_id (elsődleges kulcs)
- rang_nev

velemeny Tábla:
- velemeny_id (elsődleges kulcs)
- velemeny_felhasz_id (idegen kulcs)	
- velemeny_termek_id (idegen kulcs)	
- velemeny_ertekeles
- velemeny_szoveg
- velemeny_datum




### 5.2 Kapcsolatok
a marka_id kapcsolódik a termek_marka és a kiegeszito_marka.
a tipus_id kapcsolódik a termek_marka és a kiegeszito_marka.



Írta: Kis Alex János 
Dátum:2025.11.13.