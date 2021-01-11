const express = require('express')
const family = require('./routes/family')
const sequence = require('./routes/sequence')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/family', family)
app.use('/sequence', sequence)

var port = process.env.PORT || 3000
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
)
