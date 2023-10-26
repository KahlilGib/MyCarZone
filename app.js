const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.use(require("./router"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})