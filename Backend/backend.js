const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek", express.static("kepek"))

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'konyvtar2025'
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//Alex végpontjai





//Kornélia végpontjai











app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})