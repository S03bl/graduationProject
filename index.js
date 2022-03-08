const express = require("express");
const app = express();
const {connectToDb}=require('./models/databaseConfig')
const dotenv = require("dotenv");
dotenv.config();
const helmet=require('helmet')
const morgan=require('morgan')

/* --------------------------- other router folder -------------------------- */
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
//const ChannelRoute=require('Location')


/* --------------------------- connect to database -------------------------- */
connectToDb

/* --------------------------- middleware function -------------------------- */
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);


/* ----------------------------- listen on port ----------------------------- */
const PORT=8800
app.listen(PORT, function () {
    console.log(`The SERVER HAS STARTED ON PORT: ${PORT}`);
  })


  

  