const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Tables schema
const tableSchema = new mongoose.Schema({

  tableName:{
    type:String,
    required:true
  },
  capacity: {
    type: Number,
    required: true
  },
  isBooked:{
    type:Boolean,
    default:false,
    required:true
  }
  
});

// Create a Tables model using the schema
const Table = mongoose.model('Tables', tableSchema);

module.exports = Table;
