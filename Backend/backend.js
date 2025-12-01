const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek", express.static("kepek"))
app.use("/termekKep", express.static("termekKep"))

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
                from tipus
                inner join termek
                on termek_tipus=tipus_id
                inner join marka
                on termek_marka=marka_id
                where tipus_id=?
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
                from marka
                inner join termek
                on termek_marka=marka_id
                inner join tipus
                on termek_tipus=tipus_id
                where marka_id=?
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
        const sql=`
                select *
                from termek
                inner join tipus
                on termek_tipus=tipus_id
                WHERE (termek_nev LIKE ? OR termek_oprendszer LIKE ?)
                AND termek_ar BETWEEN ? AND ?
                `
        pool.query(sql,[`%${termek_nev}%`,`%${termek_oprendszer}%`,minAr,maxAr], (err, result) => {
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








//Kornélia végpontjai











app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})