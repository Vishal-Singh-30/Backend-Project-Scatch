const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
// require mongoose connection
const db = require('./config/mongoose-connection');
// require all routers
const ownerRouter = require('./routes/ownerRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();  // to use environment variables

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));   

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// setting up routes with routers
app.use("/owners",ownerRouter);
app.use("/users",userRouter);
app.use("/products",productRouter);


app.listen(3000);
  
