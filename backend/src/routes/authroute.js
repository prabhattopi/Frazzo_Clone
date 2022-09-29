const express=require("express")

const router=express.Router()
const {
    registerController, activeAccount, login, logout, refreshToken
}=require("../controllers/authController")
const { validRegister } = require("../middlewares/errorhandlermiddleware")

router.post("/register",validRegister,registerController)
router.post("/active",activeAccount)
router.post("/login",login)
router.get("/logout",logout)
router.get("/refresh_token",refreshToken)


module.exports=router