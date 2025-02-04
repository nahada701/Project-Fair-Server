require("dotenv").config()
const cors=require('cors')
const express=require('express')
const route=require('./routes/router')
require('./db/dbConnection')

const pfServer=express()

pfServer.use(cors())
//a middleware to get client req 
pfServer.use(express.json())
//to parse json to js object
pfServer.use(route)
//to get routes

pfServer.use('/uploads',express.static('./uploads'))
const PORT=3000||process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`projectFair server running at port ${PORT}`);
    
})
 
// pfServer.get('/',(req,res)=>{
//     res.status(200).send(`<h1 style="color:red">Project  server running  @ port 3000 and waiting for client request !!! </h1>`)

// })

 

















