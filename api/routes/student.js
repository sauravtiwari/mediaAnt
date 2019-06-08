const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Student = require("../models/student");

// for fetching student data
router.get("/", (req, res, next) => {
  Student.find()
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

// for posting data into students
router.post("/", (req, res, next) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
  });
  student.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /students",
        createdStudent: result
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
