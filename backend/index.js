const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require ('mysql2');
const res = require('express/lib/response');
const {v4:uuidv4} = require ('uuid');

const app = express();

app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mohan',
    port:3306
})

db.connect(err=>{
    if (err) {console.log(err,'dberr');}
    console.log('database connected...');
});


//get all data
app.get('/user',(req,res)=>{
   let qr = 'select * from user';
   db.query(qr,(err,result)=>{
       if(err)
       {
           console.log(err,'errs');
       }
       if(result.length>0)
       {
           res.send({
               message:'all user data',
               data:result  
           })
       }
   })
});

//create data

app.post('/user',(req,res)=>{
    console.log(req.body,'createdata');

    let uniqueId = uuidv4();
    let firstName = req.body.firstname;
   
    let lastName = req.body.lastname;
    let eMail = req.body.email;
    let dOb = req.body.dob;
    let phoneNumber = req.body.phonenumber;

    let qr = `insert into user(uniqueid,firstname,lastname,email,dob,phonenumber)values('${uniqueId}','${firstName}','${lastName}','${eMail}','${dOb}','${phoneNumber}')`;
    console.log(qr,'qr')
    db.query(qr,(err,result)=>{
        
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message:'Data inserted',
        })
    });
});

app.listen(3000,()=>{
    console.log('server running...');
})