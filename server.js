const express = require('express')
const app = express();
require('dotenv').config();
const {sendmail} = require('./controller/sendmail')
const path = require('path');
const {take_shot} = require('./controller/Genpdf')

const {bill} = require('./controller/GenBill')
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.get('/home',(req,res)=>{
    res.render('form.ejs');
})


// app.use('/pdf',take_shot);
app.use('/sendmail',sendmail)
app.use('/bill',bill)

app.listen(process.env.port,()=>{
    console.log("server is started")
})
