const express=require("express")

const router=express.Router()
const {
    registerController, activeAccount
}=require("../controllers/authController")
const { validRegister } = require("../middlewares/errorhandlermiddleware")

router.post("/register",validRegister,registerController)
router.post("/active",activeAccount)


module.exports=router