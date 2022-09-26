const express = require("express");
const mongoose = require("mongoose")
const booksRoute = require("./routes/bookRoutes");
const userRouter = require("./routes/bookUserRoute")
const cors = require('cors');
const path = require('path');
const multer = require("multer")
const dotenv = require("dotenv").config();
require('dotenv').config();
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 8595

//middleware
app.use(cors({
  credentials: true,
  origin:"http://localhost:3001",
  methods: "GET, POST, OPTIONS, PUT, DELETE "
}))

//app.use(cors({methods}))
app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
  extended: true

}))

app.use(booksRoute);
app.use(userRouter);




const mongoUri = process.env.MongoURL;

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology : true})
.then(result => {
    if(result)
    console.log("connected uploaded books to database ")
}).catch(err => {
    console.log(err) 
})


app.use(express.static('public'));







app.listen(PORT, () => console.log(`server running on ${8595}`))