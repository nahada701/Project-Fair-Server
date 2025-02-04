const projects=require('../models/projectModel')

exports.addProjectController=async(req,res)=>{
    console.log('inside add project controller');

    const userId=req.userId
    const{ title, languages, github, website, overView}=req.body
    const projectImg=req.file.filename

    try{
        const existingProject=await projects.findOne({github})

        if(existingProject){
            res.status(406).json("project already added")
        }
        else{
           const newProject=new projects({title, languages, github, website, overView,projectImg,userId}) 

           await newProject.save()

           res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(401).json(err)
    }    
}

exports.getHomeProjectsController=async(req,res)=>{
    console.log("inside get home projects conrtoller");
    
    try{

        const homeProjects=await projects.find().limit(3)

            res.status(200).json(homeProjects)
        
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getAllProjects=async(req,res)=>{
    console.log("inside all projects controller");
    const searchKey=req.query.search
    const query={
        languages:{
            $regex:searchKey,
            $options:"i"
            // $options:"i" make the search key to non case sensitive
        }
    }
    try{
        const allprojects=await projects.find(query)
        res.status(200).json(allprojects)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.getUserProjects=async(req,res)=>{
    console.log("inside user projects controller");
    
    const userId=req.userId
    try{
        const userProjects=await projects.find({userId})

        res.status(200).json(userProjects)

    }
    catch(err){
        res.status(401).json(err)
    }


}


exports.editUserProject=async(req,res)=>{

    console.log("inside editUserproject");
    const {title,languages,github,website,overView,projectImg}=req.body
    
    
    const uploadImg=req.file?req.file.filename:projectImg
  
    
    const userId=req.userId
    const {pid}=req.params
    console.log(pid);
    

    try {

        const updatedProject=await projects.findByIdAndUpdate({_id:pid},{title,languages,github,website,overView,projectimg:uploadImg,userId},{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)

        
    } catch (err) {
        res.status(401).json(err)
        
    }
}

exports.deleteUserProject=async(req,res)=>{
    console.log("inside user delete controller");

    const {pid}=req.params

    try{
        const removedProject=await projects.findByIdAndDelete({_id:pid})
        //no need to save when deleting
        res.status(200).json(removedProject)
    }catch(err){
        res.status(401).json(err)
    }
    
}