const express=require('express')
const userController=require('../controller/userController')
const projectController=require("../controller/projectController")
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware=require('../middlewares/multerMiddleware')

//router method helps to create route
const router=new express.Router()

//to post register data
router.post('/register',userController.userRegisterController)


//to get userData from user collection have to send req.body to check the data exist
//to 

router.post('/login',userController.userLoginController)


// to add projects to projets db

router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)

//to get 3 projets to show on homw page

router.get('/get-home-projects',projectController.getHomeProjectsController)

//to get all projects only logined user can access all projects so

router.get('/get-all-projects',jwtMiddleware,projectController.getAllProjects)

//to get projects of a particular user


router.get('/get-user-projects',jwtMiddleware,projectController.getUserProjects)

//to edit and update project detils

router.put('/edit-user-projects/:pid',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.editUserProject)

// to delete user project
router.delete('/delete-user-project/:pid',jwtMiddleware,projectController.deleteUserProject)

//to edit profilepic

router.put('/edit-profile',jwtMiddleware,multerMiddleware.single('profilepic'),userController.editProfileController)

module.exports=router
