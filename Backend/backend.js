const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
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
    const sql=`SELECT * FROM termek inner join tipus
                on termek_tipus=tipus_id
                inner join marka
                on termek_marka=marka_id`
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
                select *
                FROM tipus
                inner join termek
                on termek_tipus=tipus_id
                inner join marka
                on termek_marka=marka_id
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
                select *
                FROM marka
                inner join termek
                on termek_marka=marka_id
                inner join tipus
                on termek_tipus=tipus_id
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
                select *
                FROM termek
                inner join tipus
                on termek_tipus=tipus_id
                WHERE (termek_nev LIKE ? OR termek_oprendszer LIKE ?)
                and(termek_ar BETWEEN ? AND ?)
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

//Hírekhez
app.get('/hirek', (req, res) => {
    const sql=`SELECT * FROM blog`
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






//Kornélia végpontjai

//termék törlés id alapján

app.delete('/termekTorles/:termek_id', (req, res) => {
        const {termek_id} = req.params
        const sql = `DELETE FROM termek WHERE termek_id=?`
        pool.query(sql,[termek_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres törlés"})
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

app.put('/termekModosit/:termek_id', (req, res) => {
    const {termek_id} = req.params
    const {termek_nev, termek_ar, termek_szin, termek_kijelzo, termek_processzor, termek_kapacitas, termek_oprendszer,
        termek_meret, termek_leiras, termek_kep, termek_marka, termek_tipus} = req.body
    const sql=`UPDATE termek SET termek_nev=?, termek_ar=?, termek_szin=?, termek_kijelzo=?, termek_processzor=?,
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
})

//termék hozzáadás

app.post('/termekHozzaad', (req, res) => {
    const {termek_nev, termek_ar, termek_szin, termek_kijelzo, termek_processzor, termek_kapacitas, termek_oprendszer,
        termek_meret, termek_leiras, termek_kep, termek_marka, termek_tipus} = req.body
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
    const sql=` INSERT INTO tipus (tipus_nev) values (?)`
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

// blog törlés id alapján

app.delete('/blogTorles/:blog_id', (req, res) => {
        const {blog_id} = req.params
        const sql = `DELETE FROM blog WHERE blog_id=?`
        pool.query(sql,[blog_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }

        return res.status(200).json({message:"Sikeres törlés"})
        })
})

// minden blog lekérdezése
app.get('/blog', (req, res) => {
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


// egy  blog lekérdezése

app.get('/blog/:blog_id', (req, res) => {
    const sql=`SELECT blog_cim, blog_szoveg, blog_kep FROM blog WHERE blog_id=?`
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

// blog módosítás id alapján

app.put('/blogModosit/:blog_id', (req, res) => {
    const {blog_id} = req.params
    const {blog_cim,blog_szoveg,blog_kep} = req.body
    const sql=`UPDATE blog SET blog_cim=?,blog_szoveg=?,blog_datum=?,blog_kep=? WHERE blog_id=?`
    pool.query(sql,[blog_cim,blog_szoveg,blog_kep,blog_id], (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }

    return res.status(200).json({message:"Sikeres módosítás"})
    })
})

//blog hozzáadás

app.post('/blogHozzaad', (req, res) => {
    const {blog_cim,blog_szoveg,blog_kep} = req.body
    const blog_datum = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const sql=`INSERT INTO blog (blog_cim,blog_szoveg,blog_datum,blog_kep) VALUES (?,?,?,?)`
    pool.query(sql,[blog_cim,blog_szoveg,blog_datum,blog_kep], (err, result) => {
    if (err) {
        console.log(err)
        return res.status(500).json({error:"Hiba"})
    }
    return res.status(200).json({message:"Sikeres hozzáadás"})
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








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})