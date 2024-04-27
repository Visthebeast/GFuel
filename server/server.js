require('dotenv').config()
const express = require("express")
const transactionRoutes = require("./routes/transactions")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

//middleware
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

app.use('/api/transactions',transactionRoutes)

//test
// app.get("/",cors(),(req,res)=>{
//     res.json({msg: "welcome"})
// })

app.listen(process.env.PORT, () => {
    console.log("Port connected at 8000");
})