const mongoose=require('mongoose')

//define schema (structure of the data)

const userSchema=new mongoose.Schema({
    username:{

        type:String,
        required:true

    },
    email:{

        type:String,
        required:true,
        unique:true

    },
    password:{

        type:String,
        required:true

    },
    github:{

        type:String,

    },
    linkedin:{

        type:String,

    },
    profilepic:{

        type:String,

    }
}) 

//create model for users which is a copy of db so the name of the model and collection

const users=mongoose.model("users",userSchema)

module.exports=users