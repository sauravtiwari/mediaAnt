const mongoose = require('mongoose');
mongoose.Promise = global.Promise 

const classSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
    class: { type: String },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required:true },
  }); 

module.exports = mongoose.model('Classes', classSchema);  