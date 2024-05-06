require('dotenv').config()
const express = require("express")
const transactionRoutes = require("./routes/transactions")
//const collection = require("./mongo")
const mongoose = require('mongoose')
const cors = require("cors")
const app = express()
// app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

//middleware
app.use(express.json())
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

app.use('/api/transactions',transactionRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
          console.log("Connected to db & listening on Port 8000");
        });
    })
    .catch((error) => {
        console.log(error)
    })

//test
// app.get("/",cors(),(req,res)=>{
//     res.json({msg: "welcome"})
// })

