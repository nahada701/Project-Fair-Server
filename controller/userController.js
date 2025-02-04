const users=require('../models/userModel')
const jwt=require('jsonwebtoken')
exports.userRegisterController=async(req,res)=>{
    console.log("inside user register control");
    //req.body contails the data user send while requesting
    const{username,email,password}=req.body    
    console.log(username,email,password);
    //passing respnse to client
    //ascnchronous operation so try catch block is used
    try{
        const existingUser=await users.findOne({email:email})
        if(existingUser){
            res.status(406).json("user already exists")
        }
        else{
            //user registraion

            //direct insrtion of data is not possible since the controller cannot directly communicate with mongodb
            //so create an object in the model and send data as argument as object
            const newUser=new users({username,email,password,github:"",linkedin:"",profilepic:""})

            await newUser.save()

            //to save in te mongodb

            res.status(200).json(newUser)


        }
    }
    catch(err){
        res.status(401).json(err)
    }



    // res.status(200).json("request recieveed")


    
}

exports.userLoginController=async(req,res)=>{
    console.log("inside user login control");
    const {email,password}=req.body

    //try blcok is used as its asynchronous to get data from collection
    // const existingUser=await users.findOne({email:email,password:password})
    // or
   try{ 
    const existingUser=await users.findOne({email,password})

    //while finding on the db use await

    if(existingUser){
        //if authentication successful for the user a token is genrated to make sure only the authenticated users get to explore all the fucntionalities 

       const token= jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)

        res.status(200).json({user:existingUser,token})
    }
    else{
        res.status(404).json("invalid email or password")
    }}
    catch(err){
        res.status(401).json(err)
    }

}

exports.editProfileController=async(req,res)=>{
    console.log('inside editProfileController');
    
    const {username,email,password,github,linkedin,profilepic}=req.body

    const uploadImg=req.file?req.file.filename:profilepic

    const userId=req.userId

    try{

        const updatedProfile=await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profilepic:uploadImg},{new:true})

        await updatedProfile.save()
        res.status(200).json(updatedProfile)

    }catch(err){
        res.status(401).json(err)
    }
}