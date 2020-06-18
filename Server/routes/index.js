var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var my_database = mysql.createConnection({
     host: '', // RDS Instance endpoint
     port : '', // RDS Instance port
     user : '', // RDS Databse Username (DBUsername from the rds.yml file)
     password: '', // RDS Databse Password (DBPassword from the rds.yml file)
     database: '' // RDS Database Name (DBName from the rds.yml file)
});

my_database.connect(function(err){
     if (err) throw err;
     console.log("Connected!");
});

router.get('/', function(req, res, next){
    my_database.query('SELECT * from contacts;', function(err,   result, fields){
        if (err) throw err;
        res.send(JSON.stringify(result));
   });
});

router.put('/put', (req, res) => {
     let usr = req.body;
     var sql = "UPDATE contacts SET Ime = ?, Prezime = ?, Email = ?, Telefon = ?, Adresa = ?, Linkedin = ?, Skype = ?, Instagram = ?, Datum_rodjenja = ? WHERE JMBG = ?;"
     my_database.query(sql, [usr.ime, usr.prezime, usr.email, usr.telefon, usr.adresa, usr.linkedin, usr.skype, usr.instagram, usr.datumRodjenja, usr.jmbg], (err, rows, fields) => {
         if (!err){
          res.send("Successfully updated");
         }
         else
             console.log(err);
     })
 });

 router.post('/post', (req, res) => {
     let usr = req.body;
     var sql = "INSERT INTO contacts (Ime, Prezime, Email, Telefon, Adresa, Linkedin, Skype, Instagram, Datum_rodjenja, JMBG) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
     my_database.query(sql, [usr.ime, usr.prezime, usr.email, usr.telefon, usr.adresa, usr.linkedin, usr.skype, usr.instagram, usr.datumRodjenja, usr.jmbg], (err, rows, fields) => {
         if (!err)
         res.send("Successfully created!");
         else
             console.log(err);
     })
 });

 router.delete('/delete', (req, res) => {
     let usr = req.body;
     my_database.query('DELETE FROM contacts WHERE JMBG = ?', [usr.JMBG], (err, rows, fields) => {
         if (!err)
         res.send("Successfully deleted!");
         else
             console.log(err);
     })
 });

module.exports = router;