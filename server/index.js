const express = require("express")
const app = express()

app.get('/hello', (req,res) => {
    res.send('hello world')
})

app.listen(5003, () => {
    console.log('Server started on 5003')
})