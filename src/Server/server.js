const express = require('express');
const mysql=require('mysql');
const cors=require('cors');

const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shekom202412',
    database: 'inventorymanagement'
});
connection.connect(function(err)
{
    if(err) throw err;

    console.log("connected");
app.use(cors());

});
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
//app.use(express.static(path.join(__dirname, 'build')))
app.post('/server',(req,res)
{
    let data = {Productname: req.body.Productname, Serialno: req.body.Serialno, Quantity: req.body.Quantity, Price: req.body.Price, Name: req.body.Name};
    let sql = "Insert into products Values ('"+Productname+"','"+Serialno+"','"+Quantity+"','"+Price+"','"+"','"+Name+"')";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
  }); 