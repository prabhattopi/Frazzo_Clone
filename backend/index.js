const path=require("path")
const express =require("express")
const dotenv=require("dotenv")
const colors=require("colors")
const morgan=require("morgan")
const cors=require("cors")
const PORT=process.env.PORT || 4000
const bodyParser=require("body-parser")
const {errorHandle}=require("./src/middlewares/errorhandlermiddleware")
const connectDB=require("./src/config/db")


//config .evn to ./src/config/config.evv
dotenv.config({ path: './src/config/config.env' })

connectDB()



const app=express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())






if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))



