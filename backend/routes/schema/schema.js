const mongoose = require('mongoose');

  const Schema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
   
  })
  const Task = mongoose.model('new_task', Schema);

module.exports = Task;