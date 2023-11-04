const express =  require('express')
const morgan = require('morgan')
require('dotenv').config();
const colors  = require('colors')
const connectDB= require('./config/db')
const path = require('path');

connectDB();
const app = express();
app.use(express.json())
app.use(morgan("dev"))

// app.get("/", (req,res)=>{
//     res.status(200).send({
//         message:"server running",
//     });
// })

app.use('/api/v1' , require("./routes/userRoutes")) ;
app.use('/api/v1/admin' , require("./routes/adminRoutes")) ;
app.use('/api/v1/doctor' , require("./routes/doctorRoutes"))

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*' , function(req,res){
    res.sendFile(path.join(__dirname , "./client/build/index.html"));
})


const port =process.env.PORT || 8080

app.listen(port , ()=>{
    try{ 

        console.log(`Server Running on port ${port} and on ${process.env.NODE_MODE} MODE`.blue)
    }catch(error){
        console.log(error)
        
    }
})