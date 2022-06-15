const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
env.config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

let url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.hfzng.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',authRoutes);
app.use('/',taskRoutes);

mongoose.connect(url,{useNewUrlParser : true,useUnifiedTopology : true})
.then (() => {
    console.log('Database Connected ...');
})
.catch((error) => {
    console.log(error.message);
})

app.listen(process.env.PORT,() => {
    console.log(`Server is running on the port ${process.env.PORT}`);
})