const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Classes = require("../models/class");
const Student = require("../models/student");

'use strict';

const fs = require('fs');
const moment = require('moment');
const mdq = require('mongo-date-query');
const json2csv = require('json2csv').parse;
const path = require('path');
const excel = require('exceljs');
const fields = ['class','student.name'];
 
// for fetching classes data
router.get("/", (req, res, next) => {
  Classes.find()
    .exec() 
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// for posting data into class
router.post("/", (req, res, next) => {
  const classes = new Classes({
    _id: new mongoose.Types.ObjectId(), 
    class: req.body.class,
    student: req.body.id
  });
  classes
    .save()
    .then(result => { 
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /classes",
        createdClasses: result 
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//  for exporting csv file
router.get("/classdata", (req, res, next) => {
  Classes.find({})
  .populate('student','name')
    .exec()
    .then(docs => {
      console.log(docs); 
      let csv;
      csv = json2csv(docs, { fields });

      const filePath = path.join(__dirname, "..", "public", "export", "data.csv");

 
      fs.writeFile(filePath, csv, function (err,csv) {
        if (err) {
          return res.json(err).status(500); 
        }
        else {
          const filePath = path.join(__dirname, "..", "public", "export", "data.csv");
          // res.download(filePath); 
          var fileName = "data.csv"; // The default name the browser will use
          // const file = fs.createReadStream(filePath); 
          // res.pipe(file);
           res.download(filePath, fileName)  
        } 
      }); 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
