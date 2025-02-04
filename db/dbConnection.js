const mongoose=require('mongoose')
// connect model and db
//import connection string
const connection_string=process.env.CONNECTION_STRING

//CONNECT MONGOOSE TO DB

mongoose.connect(connection_string).then(res=>{
    console.log("mongoDB atlas connected to PfServer");
    
}).catch(err=>{
    console.log('connection ',err);
    
})


