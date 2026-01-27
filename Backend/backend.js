const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3000

// Multer storage konfigurációja
const storage = (mappa) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, mappa)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = (mappa) => multer({ storage: storage(mappa) })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/kepek", express.static("kepek"))
app.use("/termekKep", express.static("termekKep"))
app.use("/blogKep", express.static("blogKep"))

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nextifyadatb'
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const login = require('./login');
app.use('/login', login);

//Alex végpontjai
app.get('/termek', (req, res) => {
    const sql=`SELECT * FROM termek INNER JOIN tipus
                ON termek_tipus=tipus_id
                INNER JOIN marka
                ON termek_marka=marka_id`
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)

    
    })

    

})

app.get('/tipus', (req, res) => {
    const sql=`SELECT * FROM tipus`
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)

    
    })

    

})

app.get('/marka', (req, res) => {
    const sql=`SELECT * FROM marka`
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)

    
    })

    

})

app.post('/tipusuTermek', (req, res) => {
        const {tipus_id} =req.body
        const sql=`
                SELECT *
                FROM tipus
                INNER JOIN termek
                ON termek_tipus=tipus_id
                INNER JOIN marka
                ON termek_marka=marka_id
                WHERE tipus_id=?
                `

        pool.query(sql,[tipus_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})

app.post('/markajuTermek', (req, res) => {
        const {marka_id} =req.body
        const sql=`
                SELECT *
                FROM marka
                INNER JOIN termek
                ON termek_marka=marka_id
                INNER JOIN tipus
                ON termek_tipus=tipus_id
                WHERE marka_id=?
                `

        pool.query(sql,[marka_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})


app.post('/termeknevKeres', (req, res) => {
        const {termek_nev,termek_oprendszer,minAr,maxAr} =req.body
        //minAr és maxAr üres
        console.log(minAr  )
        console.log(maxAr  )
        //console.log(typeof(minAr))
        let min = Number(minAr)
        let max = Number(maxAr)
        if (minAr==""){
            min=0
        }
        if (maxAr==""){
            max=999999999
        }

        console.log(min)
        console.log(max)    

       

        
        const  sql=`
                SELECT *
                FROM termek
                INNER JOIN tipus
                ON termek_tipus=tipus_id
                WHERE (termek_nev LIKE ? OR termek_oprendszer LIKE ?)
                AND (termek_ar BETWEEN ? AND ?)
                `

             pool.query(sql,[`%${termek_nev}%`,`%${termek_oprendszer}%`,min,max], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })    
            
       
})

//Hírekhez (akció)
app.get('/hirek1', (req, res) => {
    const sql=`SELECT * FROM blog WHERE blog_fajta=1 `
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)

    
    })

    

})

 app.get('/hirek2', (req, res) => {
    const sql=`SELECT * FROM blog WHERE blog_fajta=2 `
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)

    
    })

    

}) 

app.get('/hirek3', (req, res) => {
    const sql=`SELECT * FROM blog WHERE blog_fajta=3 `
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)

    
    })

    

})

//backend végpont select in

app.post('/termekSelectIn', (req, res) => {
    const { termekIds } = req.body; // várjuk pl.: "1,3,7"

    

    // A stringet tömbbé alakítjuk
    const idsArray = termekIds.split(",").map(id => id.trim());

    if (idsArray.length === 0) {
        return res.status(400).json({ error: "A listád üres!" });
    }

    // Készítünk annyi ?-t, amennyi ID van
    const placeholders = idsArray.map(() => "?").join(",");

    const sql = `SELECT * FROM termek WHERE termek_id IN (${placeholders})`;

    pool.query(sql, idsArray, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hiba a lekérdezés során!" });
        }
        
        return res.status(200).json(result);
    });
});





//Kornélia végpontjai

//termék törlés id alapján

app.delete('/termekTorles/:termek_id', (req, res) => {
        const {termek_id} = req.params
        
        // Először lekérdezzük a kép fájlnevét
        const selectSql = `SELECT termek_kep FROM termek WHERE termek_id=?`
        pool.query(selectSql, [termek_id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
            }
            
            // Kép törlése a termekKep mappából
            if (result.length > 0 && result[0].termek_kep) {
                const imagePath = path.join('termekKep/', result[0].termek_kep)
                if (fs.existsSync(imagePath)) {
                    fs.unlink(imagePath, (err) => {
                        if (err) console.log('Kép törlési hiba:', err)
                    })
                }
            }
            
            // Adatbázisban törlés
            const deleteSql = `DELETE FROM termek WHERE termek_id=?`
            pool.query(deleteSql, [termek_id], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({error:"Hiba"})
                }
                return res.status(200).json({message:"Sikeres törlés"})
            })
        })
})

//egy termék lekérdezése

app.get('/termek/:termek_id', (req, res) => {
    const sql=`SELECT termek_nev, termek_ar, termek_szin, termek_kijelzo, termek_processzor, termek_kapacitas, termek_oprendszer,
        termek_meret, termek_leiras, termek_kep, termek_marka, termek_tipus FROM termek WHERE termek_id=?`
    const {termek_id} = req.params
    pool.query(sql,[termek_id], ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result[0])
    
    })   

})

// termék módosítás id alapján

app.put('/termekModosit/:termek_id', upload("termekKep/").single('termek_kep'), (req, res) => {
    const {termek_id} = req.params
    const {termek_nev, termek_ar, termek_szin, termek_kijelzo, termek_processzor, termek_kapacitas, termek_oprendszer,
        termek_meret, termek_leiras, termek_marka, termek_tipus} = req.body
    
    if (req.file) {
        // Régi kép törlése
        let oldImageSql = `SELECT termek_kep FROM termek WHERE termek_id=?`
        pool.query(oldImageSql, [termek_id], (err, result) => {
            if (!err && result.length > 0 && result[0].termek_kep) {
                const oldImagePath = path.join('termekKep/', result[0].termek_kep)
                if (fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.log('Régi kép törlési hiba:', err)
                    })
                }
            }
        })

        let termek_kep = req.file.originalname
        let sql=`UPDATE termek SET termek_nev=?, termek_ar=?, termek_szin=?, termek_kijelzo=?, termek_processzor=?,
            termek_kapacitas=?, termek_oprendszer=?, termek_meret=?, termek_leiras=?, termek_kep=?, termek_marka=?,
            termek_tipus=?
            WHERE termek_id=?`
        pool.query(sql,[termek_nev, termek_ar, termek_szin, termek_kijelzo, termek_processzor, termek_kapacitas, termek_oprendszer,
            termek_meret, termek_leiras, termek_kep, termek_marka, termek_tipus, termek_id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
            }

            return res.status(200).json({message:"Sikeres módosítás"})
        })
    } else {
        // Ha nincs új kép, csak a többi mező update-lése
        let sql=`UPDATE termek SET termek_nev=?, termek_ar=?, termek_szin=?, termek_kijelzo=?, termek_processzor=?,
            termek_kapacitas=?, termek_oprendszer=?, termek_meret=?, termek_leiras=?, termek_marka=?,
            termek_tipus=?
            WHERE termek_id=?`
        pool.query(sql,[termek_nev, termek_ar, termek_szin, termek_kijelzo, termek_processzor, termek_kapacitas, termek_oprendszer,
            termek_meret, termek_leiras, termek_marka, termek_tipus, termek_id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
            }

            return res.status(200).json({message:"Sikeres módosítás"})
        })
    }
})

//termék hozzáadás

app.post('/termekHozzaad', upload("termekKep/").single('termek_kep'), (req, res) => {
    const {termek_nev, termek_ar, termek_szin, termek_kijelzo, termek_processzor, termek_kapacitas, termek_oprendszer,
        termek_meret, termek_leiras, termek_marka, termek_tipus} = req.body
    let termek_kep = ""
    
    if (req.file) {
        termek_kep = req.file.originalname
    }
    
    const sql=`INSERT INTO termek (termek_id, termek_nev, termek_ar, termek_szin, termek_kijelzo, termek_processzor,
               termek_kapacitas, termek_oprendszer, termek_meret, termek_leiras, termek_kep, termek_marka,
               termek_tipus)
               VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?)`
    pool.query(sql,[termek_nev, termek_ar, termek_szin, termek_kijelzo, termek_processzor, termek_kapacitas, termek_oprendszer,
        termek_meret, termek_leiras, termek_kep, termek_marka, termek_tipus], (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }
    return res.status(200).json({message:"Sikeres hozzáadás"})
    })
})

//tipustörlés id alapján

app.delete('/tipusTorles/:tipus_id', (req, res) => {
    const { tipus_id } = req.params;
    const sql = `DELETE FROM tipus WHERE tipus_id = ?`;

    pool.query(sql, [tipus_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hiba" });
        }

        return res.status(200).json({ message: "Sikeres törlés" });
    });
});

// egy tipus lekérdezése id alapján

app.get('/tipus/:tipus_id', (req, res) => {
    const sql=`SELECT tipus_nev FROM tipus WHERE tipus_id=?`
    const {tipus_id} = req.params
    pool.query(sql,[tipus_id], ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result[0])
    })
})

// típus módosítás id alapján

app.put('/tipusModosit/:tipus_id', (req, res) => {
    const {tipus_id} = req.params
    const {tipus_nev}= req.body
    const sql=`UPDATE tipus SET tipus_nev=? WHERE tipus_id=?`
    pool.query(sql,[tipus_nev, tipus_id], (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }

    return res.status(200).json({message:"Sikeres módosítás"})
    })
})


//típus hozzáadás

app.post('/tipusHozzaad', (req, res) => {
    const {tipus_nev}= req.body
    const sql=`INSERT INTO tipus (tipus_nev) VALUES (?)`
    pool.query(sql,[tipus_nev], (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }
    return res.status(200).json({message:"Sikeres hozzáadás"})
    })
})

//márka törlés id alapján

app.delete('/markaTorles/:marka_id', (req, res) => {
        const {marka_id} = req.params
        const sql = `DELETE FROM marka WHERE marka_id=?`
        pool.query(sql,[marka_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres törlés"})
        })
})

// egy márka lekérdezése

app.get('/marka/:marka_id', (req, res) => {
    const sql=`SELECT marka_nev FROM marka WHERE marka_id=?`
    const {marka_id} = req.params
    pool.query(sql,[marka_id], ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result[0])
    })
})

// márka módosítás id alapján

app.put('/markaModosit/:marka_id', (req, res) => {
    const {marka_id} = req.params
    const {marka_nev} = req.body
    const sql=`UPDATE marka SET marka_nev=? WHERE marka_id=?`
    pool.query(sql,[marka_nev, marka_id], (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }

    return res.status(200).json({message:"Sikeres módosítás"})
    })
})

//márka hozzáadás

app.post('/markaHozzaad', (req, res) => {
    const {marka_nev} = req.body
    const sql=`INSERT INTO marka (marka_nev) VALUES (?)`
    pool.query(sql,[marka_nev], (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }
    return res.status(200).json({message:"Sikeres hozzáadás"})
    })
})

// kezdolap törlés id alapján

app.delete('/kezdolapTorles/:blog_id', (req, res) => {
        const {blog_id} = req.params
        
        // Lekérdezzük a kép fájlnevét
        const selectSql = `SELECT blog_kep FROM blog WHERE blog_id=?`
        pool.query(selectSql, [blog_id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
            }
            
            // Kép törlése a blogKep mappából
            if (result.length > 0 && result[0].blog_kep) {
                const imagePath = path.join('blogKep/', result[0].blog_kep)
                if (fs.existsSync(imagePath)) {
                    fs.unlink(imagePath, (err) => {
                        if (err) console.log('Kép törlési hiba:', err)
                    })
                }
            }
            
            // Adatbázisban törlés
            const deleteSql = `DELETE FROM blog WHERE blog_id=?`
            pool.query(deleteSql, [blog_id], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({error:"Hiba"})
                }
                return res.status(200).json({message:"Sikeres törlés"})
            })
        })
})

// egy  kezdolap lekérdezése

app.get('/kezdolap/:blog_id', (req, res) => {
    const sql=`SELECT blog_cim, blog_szoveg, blog_kep, blog_fajta, blog_datum FROM blog WHERE blog_id=?`
    const {blog_id} = req.params
    pool.query(sql,[blog_id], ( err, result) => {
    if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result[0])
    })
})

// minden kezdolap lekérdezése

app.get('/kezdolap', (req, res) => {
    const sql=`SELECT * FROM  blog `
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)
    
    })
})


// egy kezdolap lekérdezése

app.get('/kezdolap/:blog_id', (req, res) => {
    const sql=`SELECT blog_cim, blog_szoveg, blog_kep, blog_fajta FROM blog WHERE blog_id=?`
    const {blog_id} = req.params
    pool.query(sql,[blog_id], ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result[0])
    })
})

// kezdolap módosítás id alapján

app.put('/kezdolapModosit/:blog_id', upload("blogKep/").single('blog_kep'), (req, res) => {
    const {blog_id} = req.params
    const {blog_cim,blog_szoveg,blog_fajta} = req.body

    if (req.file) {
        // Régi kép törlése
        const oldImageSql = `SELECT blog_kep FROM blog WHERE blog_id=?`
        pool.query(oldImageSql, [blog_id], (err, result) => {
            if (!err && result.length > 0 && result[0].blog_kep) {
                const oldImagePath = path.join('blogKep/', result[0].blog_kep)
                if (fs.existsSync(oldImagePath)) {
                    fs.unlink(oldImagePath, (err) => {
                        if (err) console.log('Régi kép törlési hiba:', err)
                    })
                }
            }
        })
        
        const blog_kep = req.file.originalname
        const sql=`UPDATE blog SET blog_cim=?,blog_szoveg=?,blog_kep=?,blog_fajta=? WHERE blog_id=?`
        pool.query(sql,[blog_cim,blog_szoveg,blog_kep,blog_fajta,blog_id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
            }
            return res.status(200).json({message:"Sikeres módosítás"})
        })
    } else {
        // Ha nincs új kép, csak a többi mező update-lése
        const sql=`UPDATE blog SET blog_cim=?,blog_szoveg=?,blog_fajta=? WHERE blog_id=?`
        pool.query(sql,[blog_cim,blog_szoveg,blog_fajta,blog_id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
            }
            return res.status(200).json({message:"Sikeres módosítás"})
        })
    }
})

//kezdőlap hozzáadás

app.post('/kezdolapHozzaad', upload("blogKep/").single('blog_kep'), (req, res) => {
    const {blog_cim,blog_szoveg,blog_fajta} = req.body
    const blog_datum = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let blog_kep = ""

    if (req.file) {
        blog_kep = req.file.originalname
    }

    const sql=`INSERT INTO blog (blog_cim,blog_szoveg,blog_datum,blog_kep,blog_fajta) VALUES (?,?,?,?,?)`
    pool.query(sql,[blog_cim,blog_szoveg,blog_datum,blog_kep,blog_fajta], (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }
    return res.status(200).json({message:"Sikeres hozzáadás"})
    })
})

//minden fajta lekérdezése

app.get('/fajta', (req, res) => {   
    const sql=`SELECT fajta_id, fajta_nev FROM fajta`
    pool.query(sql, (err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)
    })
})

// minden vélemény  lekérdezése

app.get('/velemeny', (req, res) => {
    const sql=`SELECT * FROM  velemeny ORDER BY velemeny_datum DESC`
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)


    })
})

// egy  vélemény lekérdezése

app.get('/velemeny/:velemeny_id', (req, res) => {
    const sql=`SELECT velemeny_felhasz_id, velemeny_termek_id, velemeny_ertekeles, velemeny_nev, velemeny_szoveg, velemeny_datum 
               FROM velemeny
               WHERE velemeny_id=?`
    const {velemeny_id} = req.params
    pool.query(sql,[velemeny_id], ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result[0])
    })
})

// egy vélemény törlése id alapján

app.delete('/velemenyTorles/:velemeny_id', (req, res) => {
        const {velemeny_id} = req.params

        const velemeny_sql = `DELETE FROM velemeny WHERE velemeny_id=?`
        pool.query(velemeny_sql,[velemeny_id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
            }

        return res.status(200).json({message:"Sikeres törlés"})
        })
})

// vélemény lekérdezése minden

app.get('/velemenyMinden', (req, res) => {
    const sql=`SELECT velemeny_id, velemeny_felhasz_id, velemeny_termek_id, velemeny_ertekeles, velemeny_szoveg, velemeny_datum, felhasznalo_nev, termek_nev 
               FROM velemeny
               INNER JOIN felhasznalo ON velemeny_felhasz_id=felhasznalo_id
               INNER JOIN termek ON velemeny_termek_id=termek_id`
               
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)
    })
})


// egy  vélemény lekérdezése

app.get('/velemeny/:velemeny_id', (req, res) => {
    const sql=`SELECT velemeny_felhasz_id, velemeny_termek_id, velemeny_ertekeles, velemeny_nev, velemeny_szoveg, velemeny_datum 
               FROM velemeny
               WHERE velemeny_id=?`
    const {velemeny_id} = req.params
    pool.query(sql,[velemeny_id], ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result[0])
    })
})

// egy vélemény törlése id alapján

app.delete('/velemenyTorles/:velemeny_id', (req, res) => {
        const {velemeny_id} = req.params

        const velemeny_sql = `DELETE FROM velemeny WHERE velemeny_id=?`
        pool.query(velemeny_sql,[velemeny_id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
            }

        return res.status(200).json({message:"Sikeres törlés"})
        })
})

// vélemény lekérdezése minden

app.get('/velemenyMinden', (req, res) => {
    const sql=`SELECT velemeny_id, velemeny_felhasz_id, velemeny_termek_id, velemeny_ertekeles, velemeny_szoveg, velemeny_datum, felhasznalo_nev, termek_nev 
               FROM velemeny
               INNER JOIN felhasznalo ON velemeny_felhasz_id=felhasznalo_id
               INNER JOIN termek ON velemeny_termek_id=termek_id`

    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)
    })
})

// akció termékek lekérdezése
app.get('/akcioTermekek/:akcio_id', (req, res) => {
    const {akcio_id} = req.params
    const sql=`SELECT termek_id, termek_nev, termek_ar
               FROM termek
               WHERE termek_akcio_id=?`
               
    pool.query(sql, [akcio_id], (err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)
    })
})

// akció lekérdezése minden
app.get('/akcioMinden', (req, res) => {
    const sql=`SELECT akcio_id, akcio_nev, akcio_kedvezmeny, akcio_tipus, akcio_kezdete, akcio_vege
               FROM akcio
               GROUP BY akcio_id, akcio_nev, akcio_kedvezmeny, akcio_tipus, akcio_kezdete, akcio_vege
               `
               
    pool.query(sql, ( err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result)
    })
})

// egy akció lekérdezése id alapján
app.get('/akcio/:akcio_id', (req, res) => {
    const sql=`SELECT akcio_nev, akcio_kedvezmeny, akcio_tipus, akcio_kezdete, akcio_vege
               FROM akcio
               WHERE akcio_id=?`
    const {akcio_id} = req.params
    pool.query(sql, [akcio_id], (err, result) => {
        if (err){
            console.log(err)
            return res.status(500).json({error:"Hiba!"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat!"})
        }
        return res.status(200).json(result[0])
    })
})

// akció módosítás id alapján

app.put('/akcioModosit/:akcio_id', (req, res) => {
    const {akcio_id} = req.params
    const {akcio_nev, akcio_kedvezmeny, akcio_tipus, akcio_kezdete, akcio_vege, termek_id_lista} = req.body
    const termek_id_lista_str = termek_id_lista.length > 0 ? `(${termek_id_lista.join(',')})` : '(NULL)';

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hiba a kapcsolat létrehozásakor" });
        }

        connection.beginTransaction((err) => {
            if (err) { throw err; }

            const akcioSql = 
                `UPDATE akcio SET akcio_nev=?, akcio_kedvezmeny=?, akcio_tipus=?, akcio_kezdete=?, akcio_vege=? WHERE akcio_id=?`
            connection.query(akcioSql, [akcio_nev, akcio_kedvezmeny, akcio_tipus, akcio_kezdete, akcio_vege, akcio_id], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        console.log(err);
                        res.status(500).json({ error: "Hiba az akció frissítésekor" });
                    }
                )}
                const termekAkcioTorlesSql = 
                    `UPDATE termek SET termek_akcio_id=NULL WHERE termek_akcio_id=?`
                connection.query(termekAkcioTorlesSql, [akcio_id], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.log(err);
                            res.status(500).json({ error: "Hiba a termék akció törlésekor" });
                        }
                    )}
                    const termekAkcioFrissitesSql = 
                        `UPDATE termek SET termek_akcio_id=? WHERE termek_id IN ${termek_id_lista_str}`
                    connection.query(termekAkcioFrissitesSql, [akcio_id], (err, result) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.log(err);
                                res.status(500).json({ error: "Hiba a termék akció frissítésekor" });
                            }
                        )}
                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    console.log(err);
                                    res.status(500).json({ error: "Hiba a tranzakció véglegesítésekor" });
                                }
                            )}
                            return res.status(200).json({ message: "Sikeres módosítás" });
                        });
                    });
                });
            });
        });
    });
})

// akció törlése id alapján

app.delete('/akcioTorles/:akcio_id', (req, res) => {
        const {akcio_id} = req.params

        const akcio_sql = `DELETE FROM akcio WHERE akcio_id=?`
        pool.query(akcio_sql,[akcio_id], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({error:"Hiba"})
            }

        return res.status(200).json({message:"Sikeres törlés"})
        })
})

// akció felvitele

app.post('/akcioHozzaad', (req, res) => {
    const {akcio_nev, akcio_kedvezmeny, akcio_tipus, akcio_kezdete, akcio_vege, termek_id_lista} = req.body
    const termek_id_lista_str = termek_id_lista.length > 0 ? `(${termek_id_lista.join(',')})` : '(NULL)';
    const sql=`INSERT INTO akcio (akcio_nev, akcio_kedvezmeny, akcio_tipus, akcio_kezdete, akcio_vege) VALUES (?,?,?,?,?)`
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hiba a kapcsolat létrehozásakor" });
        }
        connection.beginTransaction((err) => {
            if (err) { throw err; }
            connection.query(sql, [akcio_nev, akcio_kedvezmeny, akcio_tipus, akcio_kezdete, akcio_vege], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        console.log(err);
                        res.status(500).json({ error: "Hiba az akció hozzáadásakor" });
                    })}
                const akcio_id = result.insertId;
                const termekAkcioFrissitesSql = 
                    `UPDATE termek SET termek_akcio_id=? WHERE termek_id IN ${termek_id_lista_str}`
                connection.query(termekAkcioFrissitesSql, [akcio_id], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.log(err);
                            res.status(500).json({ error: "Hiba a termék akció frissítésekor" });
                        })}
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.log(err);
                                res.status(500).json({ error: "Hiba a tranzakció véglegesítésekor" });
                            })}
                        return res.status(200).json({ message: "Sikeres hozzáadás" });
                    }); 
                });
            });
        });
    });
})
// rendelés hozzáad

app.post('/rendelesHozzaadTermekkel', (req, res) => {
    const {rendeles_felhasznalo_id, rendeles_nev, rendeles_cim, rendeles_telefonszam, rendeles_datum, rendeles_teljesitve, rendeles_termekek} = req.body

    const sql=`INSERT INTO rendeles (rendeles_id, rendeles_felhasznalo_id, rendeles_nev, rendeles_cim, rendeles_telefonszam, rendeles_datum, rendeles_teljesitve) VALUES (NULL,?,?,?,?,?,?)`
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Hiba a kapcsolat létrehozásakor" });
        }
        connection.beginTransaction((err) => {
            if (err) { throw err; }
                connection.query(sql,[rendeles_felhasznalo_id, rendeles_nev, rendeles_cim, rendeles_telefonszam, rendeles_datum, rendeles_teljesitve], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        console.log(err);
                        res.status(500).json({ error: "Hiba a rendelés hozzáadásakor" });
                    })}
                const rendeles_id = result.insertId;

                let rendelesTermekParameterek = []
                let rendelesTermekKerdojelek = ""
                for (let termek of rendeles_termekek) {
                    rendelesTermekParameterek.push(rendeles_id, termek.rendeles_termek_id, termek.rendeles_ar, termek.rendeles_darab)
                    rendelesTermekKerdojelek += rendelesTermekKerdojelek ? ",(?,?,?,?)" : "(?,?,?,?)"
                }
                let rendelesTermekHozzadasSql = `INSERT INTO rendeles_termek (rendeles_id, rendeles_termek_id, rendeles_ar, rendeles_darab) VALUES ${rendelesTermekKerdojelek}`
                connection.query(rendelesTermekHozzadasSql, rendelesTermekParameterek, (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.log(err);
                            res.status(500).json({ error: "Hiba a rendelés termék hozzáadásakor" });
                        })}
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.log(err);
                                res.status(500).json({ error: "Hiba a tranzakció véglegesítésekor" });
                            })}
                        return res.status(200).json({ message: "Sikeres hozzáadás" });
                    }); 
                });
            });
        });
    });
})

// rendeles hozzáadás

app.post('/rendelesHozzaad', (req, res) => {
    const {rendeles_felhasznalo_id, rendeles_nev, rendeles_cim, rendeles_telefonszam, rendeles_datum, rendeles_teljesitve} = req.body
    
    const sql=`INSERT INTO rendeles (rendeles_id, rendeles_felhasznalo_id, rendeles_nev, rendeles_cim, rendeles_telefonszam, rendeles_datum, rendeles_teljesitve)
               VALUES (NULL,?,?,?,?,?,?)`
    pool.query(sql,[rendeles_felhasznalo_id, rendeles_nev, rendeles_cim, rendeles_telefonszam, rendeles_datum, rendeles_teljesitve], (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }
    return res.status(200).json({message:"Sikeres hozzáadás"})
    })
})

//rendeles termék hozzáad

app.post('/rendelesTermekHozzaad', (req, res) => {
    const {rendeles_id, rendeles_termekek} = req.body
    let rendelesTermekParameterek = []
    let rendelesTermekKerdojelek = ""
    for (let termek of rendeles_termekek) {
        rendelesTermekParameterek.push(rendeles_id, termek.rendeles_termek_id, termek.rendeles_ar, termek.rendeles_darab)
        rendelesTermekKerdojelek += rendelesTermekKerdojelek ? ",(?,?,?,?)" : "(?,?,?,?)"
    }
    let rendelesTermekHozzadasSql = `INSERT INTO rendeles_termek (rendeles_id, rendeles_termek_id, rendeles_ar, rendeles_darab) VALUES ${rendelesTermekKerdojelek}`
    pool.query(rendelesTermekHozzadasSql,rendelesTermekParameterek, (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }
    return res.status(200).json({message:"Sikeres hozzáadás"})
    })
})


















app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})