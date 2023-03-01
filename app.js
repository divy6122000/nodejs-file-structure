require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const compression = require('compression')
const util = require('util')

const userRouter = require("./routes/user");

const adressRouter = require("./routes/address");

const productRouter = require("./routes/product");


const errCtrl = require('./controller/errorCtrl');


app.use(cors())
app.use(compression())

mongoose.connect(process.env.MONGODB_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { 
    console.log("Connected to MongoDB") 
}).catch(err => { console.log(err) });
mongoose.Promise = global.Promise;


app.use(bodyParser.json());


app.use("/api/user", userRouter);

app.use("/api/user/address", adressRouter);

app.use('/api/product', productRouter)


app.use('*',(req, res, next) => {
    const error = new Error("Not found");
    error.statusCode = 404;
    next(error);
});


app.use(errCtrl)

module.exports = app;
